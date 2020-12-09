CREATE OR REPLACE FUNCTION find_missing_students (
    p_year   course_selections.year%TYPE,
    p_term   course_selections.term%TYPE
) RETURN pkgs.students_table
    PIPELINED
IS
    CURSOR c_students IS
    SELECT DISTINCT stud_id
    FROM course_selections
    WHERE (year < p_year
           OR (year = p_year
               AND term < p_term))
          AND stud_id NOT IN (
        SELECT DISTINCT stud_id
        FROM course_selections
        WHERE (year = p_year
            AND term = p_term)
    );
BEGIN
    FOR v_rec IN c_students LOOP
        PIPE ROW (v_rec);
    END LOOP;
END find_missing_students;

SELECT * FROM TABLE (find_missing_students (2019, 1));