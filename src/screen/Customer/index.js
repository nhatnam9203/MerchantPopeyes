import React from 'react'
import Layout from "./layout";
import ConnectRedux from "reduxApp/ConnectRedux";
import NavigatorServices from 'navigators/NavigatorServices'

class MethodPoints extends Layout {
    constructor(props) {
        super(props)
    }
    gotoDetail=(title,placeholder)=>{
        NavigatorServices.navigate('DetailMethodPoint', {
            title: title,
            placeholder:placeholder
          });
    }


}
const mapStateToProps = (state) => ({
    token: state.dataLocal
})
export default ConnectRedux(mapStateToProps, MethodPoints)