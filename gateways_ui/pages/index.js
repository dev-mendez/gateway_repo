import GatewayList from '../components/gateway/gateway-list';
import Layout from '../components/ui/app-layout';

function Gateway(gatewayProps) {
  return (
    <Layout>
      <main>
        <GatewayList props={gatewayProps} />
      </main>
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`http://localhost:3000/gateway`);
  const data = await res.json();

  return { props: { data } };
}

export default Gateway;
