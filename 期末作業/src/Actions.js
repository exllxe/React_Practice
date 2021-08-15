import { useState } from "react";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
export const Actions = () => {
  const navigate = useNavigate();
  const [findOneProduct, setFindOneProduct] = useState();
  const [findOneCustomer, setFindOneCustomer] = useState();
  const [salesData, setSalesData] = useState([]);
  let [products, setProducts] = useState([]);
  let [orders, setOrders] = useState([]);
  let [orderDetail, setOrderDetail] = useState([]);
  

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
          window.sessionStorage.setItem("empId",data.id);
          window.sessionStorage.setItem("empName",data.Name);
          window.sessionStorage.setItem("empJob",data.Job);
          window.sessionStorage.setItem("empDeptName",data.DeptName);
          window.sessionStorage.setItem("login",JSON.stringify({"status":true,"account":data.id}));
          navigate('/app/products', { replace: true });
        } else {
          alert("帳號或密碼錯誤");
          navigate('/login', { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
        navigate('/login', { replace: true });
      });
  };
  const selectProduct = (keyWord) => {
    fetch("http://localhost/php-react/all-products.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(keyWord),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {   
          setProducts(data['products']);
        }else{
          setProducts([])
        }
      })
      .catch((err) => {
        console.log(err);
        navigate('/404', { replace: true });
      });
  };
  const selectSpecificProduct = (pid) => {
      fetch("http://localhost/php-react/one-product.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pid),
      })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        
        if (data.success) {   
          setFindOneProduct(data['products'][0].ProdName);
          console.log(data['products'][0].ProdName);
        }else{
          setFindOneProduct(null);
        }
      })
      .catch((err) => {
        console.log(err);
        navigate('/404', { replace: true });
      });
  };
  const selectOrder= (keyWord) => {
    fetch("http://localhost/php-react/all-order.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(keyWord),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data)
        if (data.success) {   
          setOrders(data['orders']);
        } else {
          setOrders([]);
        }
      })
      .catch((err) => {
        console.log(err);
        navigate('/404', { replace: true });
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
          setOrderDetail(data['detail']);
          console.log(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const selectSpecificCustomer = (cusId) => {
    fetch("http://localhost/php-react/one-customer.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cusId),
    })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      
      if (data.success) {   
        setFindOneCustomer(data['customer'][0].CustName);
        console.log(data['customer'][0].CustName);
      }else{
        setFindOneCustomer(null);
      }
    })
    .catch((err) => {
      console.log(err);
      navigate('/404', { replace: true });
    });
};
const selectSalesReport = (cusId) => {
  fetch("http://localhost/php-react/all-salesdata.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cusId),
  })
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data);
    if (data.success) {   
      setSalesData(data['salesData']);
    }else{
      setSalesData([]);
    }
  })
  .catch((err) => {
    console.log(err);
    navigate('/404', { replace: true });
  });
};
  // Inserting a new product into the database.
  const insertProduct = (newProduct) => {
    fetch("http://localhost/php-react/add-product.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {

        if (data.success) {
          alert("新增成功");
          selectProduct();
          
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const insertOrder = (newData) => {
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
          alert("新增成功");
          selectOrder();          
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const insertOrderDetail = (newData) => {
    console.log(newData);
    fetch("http://localhost/php-react/add-orderdetail.php", {
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
        console.log(data);
        if (data.success) {
          alert("新增成功");
          selectOrderDetail(newData.OrderId);          
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

  // Updating a product
  const updateProduct = (ProductData,keyWord) => {

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
        if (data.success) {
          selectProduct(keyWord);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateOrder = (OrderData,keyWord) => {
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
          console.log(data);
          selectOrder(keyWord);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateOrderDetail = (OrderDetailData,orderId) => {

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
          console.log("123");
          selectOrderDetail(orderId);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // Deleting a product.
  const deleteProduct = (theID) => {
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
          selectProduct();
          //navigate('/app/products', { replace: true });
        } else {
          alert(data.msg);
        }
        
      })
      
      .catch((err) => {
        console.log(err);
      });    
  };
  const deleteOrder = (theID) => {
    // filter outing the order
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
        selectOrder();
      } else {
        alert(data.msg);
      }
    }) 
    .catch((err) => {
      console.log(err);
    });
    
  };
  const deleteOrderDetail = (theID,orderId) => {
    
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
        selectOrderDetail(orderId);
      } else {
        alert(data.msg);
      }
      
    })
    
    .catch((err) => {
      console.log(err);
    });
    
  };
  return {
    products,
    orders,
    orderDetail,
    findOneProduct,
    findOneCustomer,
    salesData,
    editMode,
    cancelEdit,
    selectProduct,
    selectSpecificProduct,
    selectOrder,
    selectOrderDetail,
    selectUser,
    selectSpecificCustomer,
    selectSalesReport,
    updateProduct,
    updateOrder,
    updateOrderDetail,
    insertProduct,
    insertOrder,
    insertOrderDetail,
    deleteProduct,
    deleteOrder,
    deleteOrderDetail,

  };
};