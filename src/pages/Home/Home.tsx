import * as React from 'react';
import axios from 'axios'
import CardProd from "../../components/Card/Card"

export default function Home() {
  const [loading, setLoading] = React.useState(true);
  // const [cardID, setCardID] = React.useState(null)

  const [data, setData] = React.useState<any[]>([])


  React.useEffect(() => {
    axios.get("https://6764223a52b2a7619f5b899a.mockapi.io/Coutry").then(res => { console.log(res), setData(res.data) }).catch().finally(() => {
      setLoading(false)
    })
  }, [])



  return (
    <div className='container mx-auto mt-30'>
      <CardProd data={data} setData={setData} loading={loading} />
    </div>
  );
}
