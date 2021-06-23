import { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
export const Actions = () => {
  const navigate = useNavigate();
  let [users, setUsers] = useState([]);
  let [products, setProducts] = useState([]);
  let [orders, setOrders] = useState([]);
  let [orderDetail, setOrderDetail] = useState([]);
    //userLength is for showing the Data Loading message.
  //let [userLength, setUserLength] = useState(null);
  const selectUser = (newUser) => {
    console.log(newUser)
    fetch("http://localhost/php-react/login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {   
          //setUsers(data);
          window.sessionStorage.setItem("loggeSuccess",data['success']);
          window.sessionStorage.setItem("loggeId",data['id']);
          window.sessionStorage.setItem("loggeName",data['Name']);
          window.sessionStorage.setItem("loggeJob",data['Job']);
          window.sessionStorage.setItem("loggeDeptName",data['DeptName']);
          window.sessionStorage.setItem("logout",'false');
          window.sessionStorage.setItem("getCustomerData",'true');
          window.sessionStorage.setItem("orderId",'no_id')
          navigate('/app/customers', { replace: true });
        } else {
          navigate('/login', { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
        navigate('/login', { replace: true });
      });
  };
  const selectProduct = () => {
    fetch("http://localhost/php-react/all-products.php")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {   
          setProducts(data['products']);
          navigate('/app/customers', { replace: true });
        } else {
          navigate('/app/customers', { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
        navigate('/app/customers', { replace: true });
      });
  };
  const selectOrder = () => {
    fetch("http://localhost/php-react/all-order.php")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data)
        if (data.success) {   
          setOrders(data['orders']);
          //navigate('/app/orders', { replace: true });
        } else {
         // navigate('/app/orders', { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
        navigate('/app/customers', { replace: true });
      });
  };
  const selectOrderDetail = (orderId) => {
    fetch("http://localhost/php-react/all-orderdetail.php",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderId),      
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {   
          window.sessionStorage.setItem("orderId",orderId)       
          setOrderDetail(data['detail']);
          navigate('/app/orderdetail', { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
        navigate('/app/orders', { replace: true });
      });
  };
  // Inserting a new user into the database.
  const insertProduct = (newUser) => {
    fetch("http://localhost/php-react/add-product.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data)
        if (data.success) {
          window.sessionStorage.setItem("getCustomerData",'true');
          navigate('/app/customers', { replace: true });
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const insertOrder = (newData) => {
    console.log(newData)
    fetch("http://localhost/php-react/add-order.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data)
        if (data.success) {
          window.sessionStorage.setItem("getOrderData",'true');
          navigate('/app/orders', { replace: true });
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // Enabling the edit mode for a listed user.
  const editMode = (id,str) => {
    
    if(str === 'product'){
      products = products.map((product) => {
        if (product.ProdID === id) {
          product.Edit = true;
          return product;
        }
        product.Edit = false;
        return product;
      });
      setProducts(products);
    }
    if(str === 'order'){    
      orders = orders.map((order) => {
        if (order.OrderId === id) {
          order.Edit = true;
          return order;
        }
        order.Edit = false;
        return order;
      });
      setOrders(orders);
    }
    if(str === 'orderdetail'){
      orderDetail = orderDetail.map((detail) => {
        if (detail.seq === id) {
          detail.Edit = true;
          return detail;
        }
        detail.Edit = false;
        return detail;
      });
      setOrderDetail(orderDetail);
    }
  };

  // Cance the edit mode.
  const cancelEdit = (id,str) => {
    if(str === 'product'){
      products = products.map((product) => {
        if (product.ProdID === id) {
          product.Edit = false;
          return product;
        }
        return product;
      });
      setProducts(products);
    }
    if(str === 'order'){
      orders = orders.map((order) => {
        if (order.OrderId === id) {
          order.Edit = false;
          return order;
        }
        return order;
      });
      setOrders(orders);
    }
    if(str === 'orderdetail'){
      orderDetail = orderDetail.map((detail) => {
        if (detail.seq === id) {
          detail.Edit = false;
          return detail;
        }
        return detail;
      });
      setOrderDetail(orderDetail);
    }
  };

  // Updating a user.
  const updateProduct = (ProductData) => {

    fetch("http://localhost/php-react/update-product.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ProductData),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(products)
        if (data.success) {
          window.sessionStorage.setItem("getCustomerData",'true');
          navigate('/app/customers', { replace: true });
          //setProducts(products);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateOrder = (OrderData) => {
    fetch("http://localhost/php-react/update-order.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(OrderData),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          window.sessionStorage.setItem("getOrderData",'true')
          navigate('/app/orders', { replace: true });
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateOrderDetail = (OrderDetailData) => {

    fetch("http://localhost/php-react/update-orderdetail.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(OrderDetailData),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          window.sessionStorage.setItem("getOrderDetail",'true')
        } else {
          alert(data.msg);
        }
        navigate('/app/orderdetail', { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
      
  };
  // Deleting a user.
  const deleteProduct = (theID) => {
      // filter outing the user
    fetch("http://localhost/php-react/delete-product.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: theID }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data)
        
        if (data.success) {
          window.sessionStorage.setItem("getCustomerData",'true');
          navigate('app/customers', { replace: true });
        } else {
          alert(data.msg);
        }
        
      })
      
      .catch((err) => {
        console.log(err);
      });    
  };
  const deleteOrder = (theID) => {
    // filter outing the user
    console.log(theID)
    fetch("http://localhost/php-react/delete-order.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: theID}),
    })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data)
      
      if (data.success) {
        window.sessionStorage.setItem("getOrderData",'true');
        navigate('app/orders', { replace: true });
      } else {
        alert(data.msg);
      }
    }) 
    .catch((err) => {
      console.log(err);
    });
    
  };
  const deleteOrderDetail = (theID) => {
    // filter outing the user
    fetch("http://localhost/php-react/delete-orderdetail.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: theID}),
    })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data)
      
      if (data.success) {
        window.sessionStorage.setItem("getOrderDetail",'true');
        navigate('app/orderdetail', { replace: true });
      } else {
        alert(data.msg);
      }
      
    })
    
    .catch((err) => {
      console.log(err);
    });
    
  };
  return {
    users,
    products,
    orders,
    orderDetail,
    editMode,
    cancelEdit,
    selectProduct,
    selectOrder,
    selectOrderDetail,
    selectUser,
    updateProduct,
    updateOrder,
    updateOrderDetail,
    insertProduct,
    insertOrder,
    deleteProduct,
    deleteOrder,
    deleteOrderDetail,
    //userLength,
  };
};