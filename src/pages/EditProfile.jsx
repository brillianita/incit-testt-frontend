import MenuNavbar from '../components/MenuNavbar';
import EditName from '../components/EditName';
import EditPassword from '../components/EditPassword';
import { useQuery } from 'react-query'

export default function EditProfile() {
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(';').shift();
    }
  }
  const id = getCookie('id');
  const getDetailUser = async () => {
    console.log('idicookie', id)
    const response = await fetch(`http://localhost:3300/users/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    })
    const responseData = await response.json()
    console.log('responseData', responseData)

    return responseData.data
  }
  const { data, error, isError, isLoading } = useQuery('create', getDetailUser)
  console.log('resultData', data)

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (isError) {
    return <div>Error! {error.message}</div>
  }
  return (
    <>
      <MenuNavbar />
      <EditName email={data[0].email} name={data[0].name} />
      {
        data[0].isOauth ? (
          null
        ) :

          <EditPassword />
      }
    </>
  )
}