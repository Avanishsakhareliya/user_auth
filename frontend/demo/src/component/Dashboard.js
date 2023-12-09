    import axios from "axios"
    import React from "react"
    import { toast } from "react-toastify";
    import { styled } from '@mui/material/styles';
    import Table from '@mui/material/Table';
    import TableBody from '@mui/material/TableBody';
    import TableCell, { tableCellClasses } from '@mui/material/TableCell';
    import TableContainer from '@mui/material/TableContainer';
    import TableHead from '@mui/material/TableHead';
    import TableRow from '@mui/material/TableRow';
    import Paper from '@mui/material/Paper';
import Logout from "./Logout";

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        },
    }));
    
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
        border: 0,
        },
    }));
    
    
    function Dashboard(){
        const [isAdmin, setIsAdmin] = React.useState(false);
        const[getCustomerDetail,setCustomerDetail]=React.useState({})
        const [getuserDetail, setgetUserDetail]=React.useState([])
    React.useEffect(()=>{
        const authData = JSON.parse(localStorage.getItem('auth'));
        setCustomerDetail(authData)
        if (authData && authData.role === 'admin') {
            setIsAdmin(true)
            getCustomerData(authData);
        }

    },[])

    const getCustomerData=async()=>{
    try {
        const authData = JSON.parse(localStorage.getItem('auth')); 
        if (authData && authData.email && authData.token) {
            const { email, token } = authData;
            const res = await axios({
            method: 'GET',
            url: `http://localhost:9090/api/v1/get-customers`,
            headers: {
                Authorization: `Bearer ${token}`, // Assuming your API requires a token for authorization
            },
            params: {
                email: email, // Passing email as a query parameter
            },
            });

            console.log(res);
            if (res.status === 200) {
            setgetUserDetail(res?.data?.customers)
            } else {
            toast.error(res.data.message || 'Invalid user Credentials');
            }
        } else {
            toast.error('User authentication data not found');
        }
    } catch (error) {
        console.log(error)
    }
    }

        return(
            <div>
                    <Logout/>

                <div className="App">
                    Your Email is {getCustomerDetail?.email}
                    <p> and You are {getCustomerDetail?.role}</p>
                </div>

                {isAdmin &&
                    <div className="table_main">
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Id</StyledTableCell>
                                        <StyledTableCell align="right">Name</StyledTableCell>
                                        <StyledTableCell align="right">email</StyledTableCell>
                                        <StyledTableCell align="right">role</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {getuserDetail?.map((row, id) => (
                                        <StyledTableRow key={row.firstName}>
                                            <StyledTableCell component="th" scope="row">
                                                {id+1}
                                            </StyledTableCell>
                                            <StyledTableCell align="right">{row.firstName}</StyledTableCell>
                                            <StyledTableCell align="right">{row.email}</StyledTableCell>
                                            <StyledTableCell align="right">{row.role}</StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>

                }

            </div>
        )
    }

    export default Dashboard