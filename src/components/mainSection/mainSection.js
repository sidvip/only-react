import React from 'react';
import $ from 'jquery';

import Icon from '../icon/icon';
import LoginImg from '../loginImage/loginImage';

import './mainSection.css';
import {Animated} from "react-animated-css";

import Warning from '../../appearance/warning.png';
import Success from '../../appearance/success.png';

import CafeMenu from '../cafemenu/cafemenu';

import Wishlist from '../wishlist/wishlist';
import OrderList from '../orderlist/orderlist';

import CafeteriaForm from '../form/form';

import PreviewPane from '../previewPage/previewPage';
import PlaceOrder from '../placeOrder/placeOrder';
import OrderDetails from '../orderDetails/orderDetails';



export default class MainSection extends React.Component {
    
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.state = {
            showRegisterForm : true,
            wishList : [],
            orderList: [],
            darkenFirstButton: true,
            showList: true,
            trackButtonClass: undefined,
            loadBackground:false,
            showOrderInfo: false,
            totalAmountPaid: 0,
            orderNumber: 1,
            selectedOrderInfo: {},
            clickedOrder: false
        };
        this.registerButtonRef = React.createRef();
        this.loginButtonRef = React.createRef();
        this.addItemsToOrder = this.addItemsToOrder.bind(this);
        this.handleNavigation = this.handleNavigation.bind(this);
        this.hideFormDiv = this.hideFormDiv.bind(this);
        this.showFormDiv = this.showFormDiv.bind(this);
        this.toggleBackground = this.toggleBackground.bind(this);
        this.toggleSelectedItemColor = this.toggleSelectedItemColor.bind(this);
        this.updateQuantity = this.updateQuantity.bind(this);
        this.orderPlaced = this.orderPlaced.bind(this);
        this.getOrderFullDetails = this.getOrderFullDetails.bind(this);
        this.hidePreviewPanel = this.hidePreviewPanel.bind(this);
        this.showPopUp = this.showPopUp.bind(this);
    }

    showPopUp(msg, warning) {
        if (warning) {
            $('.img-logo').attr("src", Warning);
        } else {
            $('.img-logo').attr("src", Success);
        }
        $('.inline-text').text(msg);
        $('#warning-window').css({
            visibility: 'visible',
            top: '6vh',
        });
        let tO = setTimeout(() => {
            $('#warning-window').css({
                visibility: 'hidden',
                top: '0vh',
            });
            $('.img-logo').attr("src", "");
            clearTimeout(tO);
        }, 5000);
    }
    toggleBackground(value) {
        $('.select-item').css({display: value});
        $('.order-item').css({display: value});
        $('#order-wishlist-nav').css({display: value});
        $('.bottom-div').css({display: value});
    }

    toggleSelectedItemColor(ele, value) {
        for ( let child of ele.children) {
            child.style.backgroundColor = value;
        }
    }

    hideFormDiv() {
        $("#form-replace-div").css({display: 'none'});
        this.toggleBackground('block');
    }

    showFormDiv() {
        $("#form-replace-div").css({display: 'block'});
        this.toggleBackground('none');
    }

    addRemoveHighlight(isRegister, isLogin) {
        isRegister ? this.registerButtonRef.current.classList.add('selected-control') :
                        this.registerButtonRef.current.classList.remove('selected-control');
        isLogin ? this.loginButtonRef.current.classList.add('selected-control') :
                        this.loginButtonRef.current.classList.remove('selected-control');
    }
    handleLogin() {
        this.addRemoveHighlight(false, true);
        this.setState({showRegisterForm:false});
    }

    handleRegister() {
        this.addRemoveHighlight(true, false);
        this.setState({showRegisterForm:true});
    }

    handleNavigation(e) {
        if (this.state.trackButtonClass !== e.target.classList[1]) {
            this.setState({
                showList: !this.state.showList,
                darkenFirstButton: !this.state.darkenFirstButton,
                trackButtonClass: e.target.classList[1],
                showOrderInfo: !this.state.showOrderInfo
            });
        }
    }

    addItemsToOrder(selectedObject) {
        let dataArray = selectedObject.target.dataset.itemDetails.split(":");
        if (selectedObject.target.checked) {
            this.toggleSelectedItemColor(selectedObject.target.closest('tr'), "red");
            this.state.wishList.push({
                'food': dataArray[0], 'price': dataArray[1] , quantity: 1
            });
            this.setState({
                wishList: this.state.wishList,
                totalAmountPaid: this.state.totalAmountPaid + Number(dataArray[1])
            });

        } else {

            let deductedAmount;
            this.toggleSelectedItemColor(selectedObject.target.closest('tr'), "");
            this.state.wishList.forEach((ele, idx) => {
                if (ele.food === dataArray[0] && ele.price === dataArray[1]) {
                    deductedAmount = Number(dataArray[1]);
                    this.state.wishList.splice(idx, 1);
                }
            });
            this.setState({
                wishList: this.state.wishList,
                totalAmountPaid: this.state.totalAmountPaid - deductedAmount
            });
        }
    }

    orderPlaced() {
        this.state.orderList.push({
            number: this.state.orderNumber,
            price: this.state.totalAmountPaid,
            placedTime: new Date().toLocaleString(),
            time: Math.round(Math.random() * 60 + 15),
            items: this.state.wishList
        });
        this.setState({
            orderList: this.state.orderList
        });
        this.setState({
            orderNumber: this.state.orderNumber + 1
        });
    }

    updateQuantity(changedValueEle) {
        if (['Backspace', 'Delete'].includes(changedValueEle.key)) {
            changedValueEle.preventDefault();
            return;
        }
        let inputDataArray = changedValueEle.target.dataset.updateOrder.split(":");
        let piecePrice = Number(inputDataArray[1]);
        if (changedValueEle.key === 'ArrowUp') {
            let updateWishList = [];
            this.state.wishList.forEach((ele,idx) => {
                if (ele.food === inputDataArray[0] && ele.price === inputDataArray[1]) {
                    ele.quantity = Number(ele.quantity) + 1;
                }
                updateWishList.push(ele);
            });
            this.setState({
                totalAmountPaid: this.state.totalAmountPaid + piecePrice,
                wishList: updateWishList
            });
        } else if (changedValueEle.key === 'ArrowDown' && changedValueEle.target.value > "1") {
            let updateWishList1 = [];
            this.state.wishList.forEach((ele,idx) => {
                if (ele.food === inputDataArray[0] && ele.price === inputDataArray[1]) {
                    ele.quantity = Number(ele.quantity) + 1;
                }
                updateWishList1.push(ele);
            });
            this.setState({
                totalAmountPaid: this.state.totalAmountPaid - piecePrice,
                wishList: updateWishList1
            });
        }
    }

    getOrderFullDetails(selectedOrder) {
        let selectedOrderNo = selectedOrder.dataset.orderNumber;
        let info = {};
        this.state.orderList.forEach(ele => {
            let itemsString = "";
            if (Number(selectedOrderNo) === ele.number) {
                ele.items.forEach(item => {itemsString += item.food + ", ";});
                info.itemsList = itemsString;
                info.total = ele.price;
            }
        });
        this.setState({
            selectedOrderInfo: info,
            clickedOrder: !this.state.clickedOrder
        });
    }

    hidePreviewPanel(show) {
        if (show) {
            $('#preview-parent').css({display: 'block'});
            $('#main-process-div').css({'pointer-events': 'none'});
            $('#main-process-div').css({'opacity': 0.5});
        } else {
            $('#preview-parent').css({display: 'none'});
            $('#main-process-div').css({'pointer-events': 'auto'});
            $('#main-process-div').css({'opacity': 1});
        }
    }

    render() {
        return (

        <div id="main-section" >
           <Icon location="center"/>
           <div id='form-replace-div'>
                <Animated animationIn="fadeInDownBig" isVisible={true} style={{zIndex:20, position:'relative'}}>
                    <div id="form-section">
                        <div className="form-controls">
                            <button ref = {this.registerButtonRef} className="entry-button selected-control"
                                    onClick={this.handleRegister}>Sign Up</button>
                            <button ref = {this.loginButtonRef} className="entry-button"
                                    onClick={this.handleLogin}>Login</button>
                        </div>
                        <div className="main-body">
                            <CafeteriaForm isVisible={this.state.showRegisterForm} overlaidId={this.hideFormDiv}
                                showPopUpFunc={this.showPopUp}
                            />
                        </div>
                        <div id="underlay-div"></div>
                    </div>
                </Animated>
                <div className="protect-div"></div>
           </div>

            <div id="preview-parent">
                <PreviewPane psInfo={{name:"", imgName: "", orgName: "", empId: "", mobile: "", email: ""}} hideShowDiv={this.hidePreviewPanel}/>
            </div>
           <div id="main-process-div">
                <div className="login-member">
                    <LoginImg showForm={this.showFormDiv} showPSInfo={this.hidePreviewPanel}/>
                </div>
                <div className="select-item" style={{display:"none"}}>
                    <Animated animationIn="fadeInUpBig" isVisible={true}>
                        <CafeMenu selectCallBack={this.addItemsToOrder}/>
                    </Animated>
                </div>
                <div className="order-item"  style={{display:"none"}}>
                    <Animated animationIn="slideInDown" isVisible={true}>
                        <Wishlist showWishlist={this.state.showList} wishlistOrders={this.state.wishList}
                            updateQuant={this.updateQuantity}
                        />
                        <OrderList showWishlist={!this.state.showList} orders={this.state.orderList}
                            showDetails={this.getOrderFullDetails}
                        />
                    </Animated>
                </div>
                <div id="order-wishlist-nav" style={{display:"none"}}>
                    <div id="nav-div">
                        <button className={"circular-button button-1 " + (this.state.darkenFirstButton ? "button-color" : "")}
                                onClick={this.handleNavigation}></button>
                        <button className={"circular-button button-2 " + (!this.state.darkenFirstButton ?  "button-color" : "")}
                                onClick={this.handleNavigation}></button>
                    </div>
                </div>

                <div className="bottom-div" style={{display:"none"}}>
                    <PlaceOrder showOrderDetails={!this.state.showOrderInfo}
                        wishListItems={this.state.wishList.length > 0 ? true : false}
                        count={this.state.wishList.length}
                        total={this.state.totalAmountPaid}
                        orderManageCallBack={this.orderPlaced}
                    />

                    <OrderDetails showOrderDetails={this.state.showOrderInfo}
                        orderListItems={this.state.clickedOrder}
                        selectedInfo={this.state.selectedOrderInfo}
                    />
                </div>
           </div>



        </div>
        );
    };

}