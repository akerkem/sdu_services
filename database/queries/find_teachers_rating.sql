CREATE OR REPLACE FUNCTION find_teachers_rating (
    p_year   course_sections.year%TYPE,
    p_term   course_sections.term%TYPE
) RETURN pkgs.teachers_rating_table
    PIPELINED
IS
    CURSOR c_rating IS
    SELECT t.emp_id,
           ROUND(AVG (s.qiymet_yuz),4) AS rating
    FROM course_selections s
    JOIN course_sections t
        ON s.ders_kod = t.ders_kod
        AND s.year = t.year
        AND s.term = t.term
        AND s.section = t.section
    WHERE s.year = p_year
          AND s.term = p_term
    GROUP BY t.emp_id
    ORDER BY rating DESC;
BEGIN
    FOR v_rec IN c_rating LOOP
        PIPE ROW (v_rec);
    END LOOP;
END find_teachers_rating;

SELECT *
FROM TABLE (find_teachers_rating (2018, 2));