DELIMITER $$
DROP PROCEDURE IF EXISTS sp_show_user_active$$
CREATE PROCEDURE sp_show_user_active()
BEGIN
SELECT US.id,US.username,US.email,US.password_hash,US.status_id,UST.name AS status_name,US.last_login,US.created_at,US.updated_at  FROM user AS US 
INNER JOIN  user_status UST ON US.status_id=UST.id WHERE US.status_id=1 ORDER BY US.id;
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS sp_show_id_user_active$$
CREATE PROCEDURE sp_show_id_user_active(IN Id INT)
BEGIN
SELECT US.id,US.username,US.email,US.password_hash,US.status_id,UST.name AS status_name,US.last_login,US.created_at,US.updated_at  FROM user AS US 
INNER JOIN  user_status UST ON US.status_id=UST.id WHERE US.status_id=1 AND US.id=Id ORDER BY US.id;
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS sp_get_api_users$$
CREATE PROCEDURE sp_get_api_users()
BEGIN
SELECT u.id, u.username, u.email, ust.name  FROM user u
INNER JOIN user_role ur ON u.id = ur.user_id
INNER JOIN role rol ON ur.role_id = rol.id
INNER JOIN user_status ust ON u.status_id = ust.id
WHERE ur.role_id = 4;
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS sp_get_api_user_by_id
CREATE PROCEDURE sp_get_api_user_by_id(IN id INT)
BEGIN
SELECT US.id,US.username,US.email,US.password_hash,US.status_id,UST.name AS status_name,US.last_login,US.created_at,US.updated_at FROM user AS US 
INNER JOIN user_role ur ON ur.user_id = US.id
INNER JOIN  user_status UST ON US.status_id=UST.id WHERE US.id=id AND ur.role_id = 4 ORDER BY US.id;
END $$
DELIMITER ;

