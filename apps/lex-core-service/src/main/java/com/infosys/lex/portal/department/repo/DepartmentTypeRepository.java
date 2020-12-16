package com.infosys.lex.portal.department.repo;

import java.util.List;

import org.springframework.data.cassandra.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.infosys.lex.portal.department.dto.DepartmentType;

public interface DepartmentTypeRepository extends CrudRepository<DepartmentType, Integer> {
	DepartmentType findByDeptTypeAndDeptSubType(String deptType, String deptSubType);

	//@Query("select * from department_types where dept_type = ?0")
	List<DepartmentType> findByDeptTypeIgnoreCase(String deptType);
}