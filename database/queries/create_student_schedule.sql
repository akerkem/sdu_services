CREATE OR REPLACE FUNCTION create_student_schedule (
    p_stud_id   course_selections.stud_id%TYPE,
    p_year      course_sections.year%TYPE,
    p_term      course_sections.term%TYPE
) RETURN pkgs.student_schedule_table
    PIPELINED
IS
    CURSOR c_subjects IS
    SELECT p_stud_id,
           sc.ders_kod,
           sc.section,
           to_char (start_time, 'Day') AS day,
           to_number (to_char (start_time, 'HH24')) AS start_time
    FROM course_selections st
    JOIN course_schedule sc
        ON sc.year = st.year
        AND sc.term = st.term
        AND sc.section = st.section
        AND sc.ders_kod = st.ders_kod
    WHERE stud_id = p_stud_id
          AND sc.year = p_year
          AND sc.term = p_term
    ORDER BY to_char (sc.start_time, 'D'),
             start_time;

BEGIN
    FOR v_rec IN c_subjects LOOP
        PIPE ROW (v_rec);
    END LOOP;
END create_student_schedule;

SELECT * FROM TABLE (create_student_schedule ('3F2F30658127C29328718C132E7C71CE6BD484D8', 2019, 2));
