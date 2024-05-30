const authorized = (children) => {
    console.log(children);
    return(
        <div>
            <h1 className="text-center">Authorized</h1>
            <children/>
        </div>
    );


}

export default authorized;