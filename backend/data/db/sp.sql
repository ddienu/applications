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

DELIMITE $$
DROP PROCEDURE IF EXISTS sp_get_api_users$$
CREATE PROCEDURE sp_get_api_users()
BEGIN
SELECT * FROM user_role ur
INNER JOIN user us ON ur.user_id = us.id
INNER JOIN role rol ON rol.id = ur.role_id
WHERE ur.role_id = 4;
END $$
DELIMITER ;