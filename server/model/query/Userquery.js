const createUserQuery = `INSERT INTO 
users(email, first_name, last_name, address, password, is_admin, created_on, modified_on) 
      VALUES($1, $2, $3, $4, $5, $6, $7, $8) 
      returning user_id, email, first_name, last_name, address, is_admin, created_on, modified_on`;


export {
  createUserQuery,
};
