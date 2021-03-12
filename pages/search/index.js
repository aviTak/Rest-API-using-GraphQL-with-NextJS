export default function Hello({fil}){
    return (
        <>
            'hi'
            {console.log(fil)}
        </>
    );
}

export const getStaticProps = async () => {
    return {
        props: {
            fil: (new Date()).getSeconds()
        }
    }
};