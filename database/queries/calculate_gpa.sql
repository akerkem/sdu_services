CREATE OR REPLACE FUNCTION find_gpa (
    p_stud_id course_selections.stud_id%TYPE
) RETURN FLOAT 
IS
    CURSOR c_subjects IS
    SELECT to_gpa (qiymet_yuz) AS score,
           find_credits_of_subject (ders_kod) AS credits
    FROM course_selections
    WHERE stud_id = p_stud_id
          AND qiymet_yuz IS NOT NULL;
    v_credits_sum   NUMBER := 0;
    v_result        FLOAT := 0;
BEGIN
    FOR v_rec IN c_subjects LOOP
        v_result := v_result + v_rec.score * v_rec.credits;
        v_credits_sum := v_credits_sum + v_rec.credits;
    END LOOP;

    IF v_credits_sum = 0 OR v_credits_sum IS NULL THEN
        RETURN NULL;
    END IF;
    RETURN v_result / v_credits_sum;
END find_gpa;

CREATE OR REPLACE FUNCTION find_total (
    p_stud_id   course_selections.stud_id%TYPE,
    p_year      course_selections.year%TYPE,
    p_term      course_selections.term%TYPE
) RETURN pkgs.gpa_table
    PIPELINED
IS

    v_credits_sum    NUMBER := 0;
    v_result         FLOAT := 0;
    v_final_result   FLOAT;
    v_record         pkgs.gpa_rec;
    CURSOR c_subjects IS
    SELECT to_gpa (qiymet_yuz) AS score,
           find_credits_of_subject (ders_kod) AS credits
    FROM course_selections
    WHERE stud_id = p_stud_id
          AND year = p_year
          AND term = p_term
          AND qiymet_yuz IS NOT NULL; --some records missing their grades
BEGIN
    FOR v_rec IN c_subjects LOOP
        v_result := v_result + v_rec.score * v_rec.credits;
        v_credits_sum := v_credits_sum + v_rec.credits;
    END LOOP;
    IF v_credits_sum != 0 AND v_credits_sum IS NOT NULL THEN
        v_final_result := v_result / v_credits_sum;
    END IF;
    v_record.stud_id := p_stud_id;
    v_record.gpa := ROUND(find_gpa (p_stud_id), 2);
    v_record.spa := ROUND( v_final_result, 2 );
    PIPE ROW (v_record);
END find_total;

SELECT *
FROM TABLE (find_total ('3F2F30658127C29328718C132E7C71CE6BD484D8', 2019, 1));