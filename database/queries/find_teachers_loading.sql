CREATE OR REPLACE FUNCTION find_teacher_loading (
    p_emp_id   course_sections.emp_id%TYPE,
    p_year     course_sections.year%TYPE,
    p_term     course_sections.term%TYPE
) RETURN pkgs.loading_table
    PIPELINED
IS
    v_hours_sum   NUMBER := 0;
    v_result      pkgs.loading_rec;
    CURSOR c_emps IS
    SELECT ders_kod,
           section,
           hour_num
    FROM course_sections
    WHERE year = p_year
          AND term = p_term
          AND emp_id = p_emp_id;
BEGIN
    FOR v_rec IN c_emps LOOP IF (v_rec.hour_num IS NOT NULL) THEN
        v_hours_sum := v_hours_sum + v_rec.hour_num;
    ELSE
        v_hours_sum := v_hours_sum + 15 * find_object_hours (v_rec.ders_kod, p_year, p_term, v_rec.section);
    END IF;
    END LOOP;
    v_result.emp_id := p_emp_id;
    v_result.hours := v_hours_sum;
    PIPE ROW (v_result);
END find_teacher_loading;

SELECT * FROM TABLE (find_teacher_loading (10133, 2019, 1));