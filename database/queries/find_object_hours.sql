CREATE OR REPLACE FUNCTION find_object_hours (
    p_ders_kod   course_schedule.ders_kod%TYPE,
    p_year       course_schedule.year%TYPE,
    p_term       course_schedule.term%TYPE,
    p_section    course_sections.section%TYPE
) RETURN NUMBER IS
    v_result NUMBER;
BEGIN
    SELECT COUNT (*) AS hour
    INTO v_result
    FROM course_schedule
    WHERE ders_kod = p_ders_kod
          AND year = p_year
          AND term = p_term
          AND section = p_section
    GROUP BY ders_kod;
    RETURN v_result;
END find_object_hours;