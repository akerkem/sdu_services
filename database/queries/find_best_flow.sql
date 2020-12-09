CREATE OR REPLACE FUNCTION find_best_flow (
    p_emp_id     course_sections.emp_id%TYPE,
    p_ders_kod   course_selections.ders_kod%TYPE,
    p_year       course_sections.year%TYPE,
    p_term       course_sections.term%TYPE
) RETURN pkgs.best_flow_table
    PIPELINED
IS
    v_record       pkgs.best_flow_rec;
    v_section      course_sections.section%TYPE;
    v_avg_rating   FLOAT;
BEGIN
    SELECT section,
           average
    INTO
        v_section,
        v_avg_rating
    FROM (
        SELECT t.section,
               AVG (s.qiymet_yuz) AS average
        FROM course_selections s
        JOIN course_sections t 
            ON s.ders_kod = t.ders_kod
            AND s.year = t.year
            AND s.term = t.term
            AND s.section = t.section
        WHERE t.emp_id = p_emp_id
            AND t.ders_kod = p_ders_kod
            AND t.year = p_year
            AND t.term = p_term
        GROUP BY t.section
        ORDER BY average DESC
    )
    WHERE ROWNUM < 2;
    v_record.section := v_section;
    v_record.average_rating := round(v_avg_rating, 0);
    v_record.emp_id := p_emp_id;
    v_record.ders_kod := p_ders_kod;
    PIPE ROW (v_record);
END find_best_flow;

SELECT *
FROM TABLE (find_best_flow (10301, 'INF 354', 2019, 1));

select distinct ders_kod from course_selections where year = 2019 and term = 2;