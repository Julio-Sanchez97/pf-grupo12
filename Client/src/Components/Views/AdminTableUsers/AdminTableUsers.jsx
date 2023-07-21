import { useState } from "react";
import {useSelector } from "react-redux";
//import { Table } from 'react-bootstrap';
//import Form from 'react-bootstrap/Form';
import styles from "./AdminTableUsers.module.css";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, TextField, Switch, Typography, Grid } from '@mui/material';
import '@fontsource/roboto/400.css';

const AdminTableUsers = () => {
	//users estado
	const users = useSelector((state) => state.users);
	const [ data, setData ] = useState(users);
	//Paginado estados
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	//Search estado
	const [searchText, setSearchText] = useState('');

	const handleToggle = (id) => {
		setData((prevState) =>
			prevState.map((user) => (user.id === id ? { ...user, enabled: !user.enabled } : user))
		);
	};
	//REACT BOOTSTRAP
	// return (
	// 	<Table striped bordered hover responsive className={styles.container}>
	// 		<thead>
	// 			<tr>
	// 				<th>ID</th>
	// 				<th>Name</th>
	// 				<th>Creation Date</th>
	// 				<th>Number of usererties</th>
	// 				<th>Is Active</th>
	// 			</tr>
	// 		</thead>
	// 		<tbody>
	// 			{data?.map((user) => (
	// 				<tr key={user.id}>
	// 					<td className="align-middle">{user.id}</td>
	// 					<td className="align-middle">{
	// 					user.name!==null && user.lastname!==null
	// 						? `${user.name} ${user.lastname}`
	// 						: null}
	// 					</td>
	// 					<td className="align-middle">{user.createdAt}</td>
	// 					<td className="align-middle">{user.favorite.length}</td>{/* Implementar logica */}
	// 					<td className="align-middle">
	// 						<Form>
	// 							<Form.Check // prettier-ignore
	// 								type="switch"
	// 								id={user.id}
	// 								label={user.enabled?"Enabled":"Disabled"}
	// 								checked={user.enabled}
	// 								onChange={() => handleToggle(user.id)}
	// 								className={`form-switch ${styles['custom-switch']}`}
	// 							/>
	// 						</Form>
	// 					</td>
	// 				</tr>
	// 			))}
	// 		</tbody>
	// 	</Table>
	// );

	//Cambio de pagina
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  //Ordenar el numero de filas por página
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  //Busqueda de useriedad mediante dueño
  const filteredData = data.filter((user) =>
    user.id.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      {/* Titulo */}
      <Typography variant="h5" gutterBottom>
        Table Users
      </Typography>
      {/* Search */}
      <Grid container alignItems="center" justifyContent="flex-end" spacing={2}>
        <Grid item xs={12} md={4}>
          <TextField
            label="Buscar por Nombre"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            variant="outlined"
            size="small"
            fullWidth
          />
        </Grid>
      </Grid>
      <div style={{ marginBottom: '16px' }} />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Fecha de Registro</TableCell>
							<TableCell># Propiedades</TableCell>
              <TableCell>Habilitado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
              <TableRow key={user.id} className={styles.fila}>
                <TableCell>{user.id}</TableCell>
								<TableCell>{user.name===null||user.lastaname===null?null:`${user.name} ${user.lastaname}`}</TableCell>
                <TableCell>{user.createdAt}</TableCell>
                <TableCell>{user.Properties.length}</TableCell>
                <TableCell>
                  <Switch
                    checked={user.enabled}
                    color="primary"
                    inputusers={{ 'aria-label': 'controlled' }}
                    onChange={() => handleToggle(user.id)}
                  />
                  <Typography variant="body2" color="textSecondary">
                    {user.enabled ? 'Enabled' : 'Disabled'}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ marginBottom: '8px' }}></div>
      {/* Paginado */}
      <TablePagination
        className={styles.customPagination}
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default AdminTableUsers;