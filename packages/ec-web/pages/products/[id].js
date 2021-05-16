import { useRouter } from 'next/router';

const Product = (props) => {
  const { name } = props;
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <p>Product id: {id}</p>
      <p>Name: {name}</p>
    </div>
  );
};

export default Product;

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: '1' } }, { params: { id: '2' } }, { params: { id: '3' } }],
    fallback: true, // See the "fallback" section below
  };
}

export async function getStaticProps(context) {
  console.log('-- context', context);
  return {
    props: {
      name: 'name 1',
    }, // will be passed to the page component as props
  };
}
