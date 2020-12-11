package com.infosys.lex.portal.department.service;

import java.util.List;

import javax.validation.Valid;

import com.infosys.lex.portal.department.dto.Department;
import com.infosys.lex.portal.department.dto.UserDepartmentRole;
import com.infosys.lex.portal.department.model.DepartmentInfo;
import com.infosys.lex.portal.department.model.UserDepartmentInfo;

public interface PortalService {
	List<DepartmentInfo> getAllDepartments();

	DepartmentInfo getDepartmentById(Integer deptId, boolean isUserInfoRequired);

	List<Department> getDepartmentsByUserId(String userId);

	DepartmentInfo addDepartment(DepartmentInfo deptInfo) throws Exception;

	List<UserDepartmentInfo> getUserDepartments(String userId);

	UserDepartmentInfo updateUserRoleInDepartment(UserDepartmentRole userDeptRole);

	Boolean checkAdminPrivilage(Integer deptId, String userId);
}
