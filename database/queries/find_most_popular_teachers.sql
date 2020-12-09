CREATE OR REPLACE FUNCTION find_most_popular_teachers (
    p_ders_kod   course_selections.ders_kod%TYPE,
    p_year       course_selections.year%TYPE,
    p_term       course_selections.term%TYPE
) RETURN pkgs.teachers_popularity_table
    PIPELINED
IS

    CURSOR c_emps IS
    SELECT p_ders_kod, e.emp_id,
           COUNT (*) AS reg_count,
           ROUND(((MAX (reg_date) - MIN (reg_date)) / COUNT (*))* 100, 2) AS diff
    FROM course_selections   s
    JOIN course_sections     e 
        ON s.ders_kod = e.ders_kod
        AND s.section = e.section
        AND s.year = e.year
        AND s.term = e.term
    WHERE s.ders_kod = p_ders_kod
          AND s.year = p_year
          AND s.term = p_term
    GROUP BY e.emp_id, e.year, e.term
    HAVING ((MAX (reg_date) - MIN (reg_date)) / COUNT (*) != 0
            OR MAX (reg_date) IS NULL)
           AND COUNT (*) > 30
    ORDER BY diff,
             reg_count DESC;

BEGIN
    FOR v_rec IN c_emps LOOP
        PIPE ROW (v_rec);
    END LOOP;
END find_most_popular_teachers;

SELECT * FROM TABLE (find_most_popular_teachers ('MAT 251', 2019, 1));