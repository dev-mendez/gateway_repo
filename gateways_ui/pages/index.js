import GatewayList from '../components/gateway/gateway-list';
import Layout from '../components/ui/app-layout';

function Gateway(props) {
  return (
    <Layout>
      <main>
        <GatewayList gateways={props.gateways} />
      </main>
    </Layout>
  );
}
export async function getServerSideProps() {
  const res = await fetch(`${process.env.URI}/gateway`);
  const data = await res.json();
  return { props: { gateways: data.gateways } };
}

export default Gateway;
