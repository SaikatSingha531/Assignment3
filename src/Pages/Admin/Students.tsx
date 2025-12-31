import  { useEffect, useState } from 'react'
import { tablesDB } from '../../Lib/AppwriteConfig'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import type { StudentData } from '../../Typescript/Interface'

const Students = () => {
const [studentsData, setStudentsData] = useState<StudentData[]>([])
    const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await tablesDB.listRows(
          import.meta.env.VITE_APPWRITE_DATABASE as string,
          "studentdata"
        )
        console.log(resp.rows)
        setStudentsData(resp?.rows as any)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  const handleDelete = async (id: string)=>{
    try {
      await tablesDB.deleteRow(
        import.meta.env.VITE_APPWRITE_DATABASE as string,
          "studentdata",
          id
      )
       const resp = await tablesDB.listRows(
          import.meta.env.VITE_APPWRITE_DATABASE as string,
          "studentdata"
        )
        console.log(resp.rows)
        setStudentsData(resp?.rows as any)
      toast.success("Deleted Successfully")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="right">First Name</TableCell>
            <TableCell align="right">Last Name</TableCell>
            <TableCell align="right">Class</TableCell>
            <TableCell align="right">Roll Number</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {studentsData?.map((elem) => (
            <TableRow key={elem.$id}>
              <TableCell align="right">{elem.firstName}</TableCell>
              <TableCell align="right">{elem.lastName}</TableCell>
              <TableCell align="right">{elem.class}</TableCell>
              <TableCell align="right">{elem.roll}</TableCell>
              <TableCell align="right">{elem.email}</TableCell>
              <TableCell align="right">
                <Button
                onClick={()=>navigate(`/admin/students/edit/${elem.$id}`)}
                 variant="contained" color="primary" size="small" sx={{ mr: 1 }}>
                  Edit
                </Button>
                <Button
                onClick={()=>handleDelete(elem?.$id)}
                 variant="contained" color="error" size="small">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Students
