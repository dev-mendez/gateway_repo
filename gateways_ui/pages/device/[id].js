import Layout from '../../components/ui/app-layout';
import DeviceList from '../../components/device/device-list';

function Devices(deviceProps) {
  return (
    <Layout>
      <main>{<DeviceList props={deviceProps} />}</main>
    </Layout>
  );
}

Devices.getInitialProps = async (ctx) => {
  const res = await fetch(`http://localhost:3000/gateway/${ctx.query.id}`);
  const deviceProps = await res.json();
  return deviceProps;
};

export default Devices;
