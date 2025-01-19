import { useParams } from "react-router-dom"

export const Payment = () => {
  const {id} = useParams();
  console.log(id);
  return (
    <div>Payment</div>
  )
}
