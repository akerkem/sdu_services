CREATE OR REPLACE FUNCTION create_teacher_schedule (
    p_emp_id   course_sections.emp_id%TYPE,
    p_year     course_sections.year%TYPE,
    p_term     course_sections.term%TYPE
) RETURN pkgs.teacher_schedule_table
    PIPELINED
IS
    CURSOR c_subjects IS
    SELECT t.emp_id,
           s.ders_kod,
           s.section,
           to_char (start_time, 'Day') AS day,
           to_number (to_char (start_time, 'HH24')) AS start_time
    FROM course_schedule s
    JOIN course_sections t 
           ON s.year = t.year
           AND s.term = t.term
           AND s.section = t.section
           AND s.ders_kod = t.ders_kod
    WHERE t.emp_id = p_emp_id
          AND t.year = p_year
          AND t.term = p_term
    ORDER BY to_char (s.start_time, 'D'),
             start_time;
BEGIN
    FOR v_rec IN c_subjects LOOP
        PIPE ROW (v_rec);
    END LOOP;
END create_teacher_schedule;

SELECT *
FROM TABLE (create_teacher_schedule (10521, 2019, 2));