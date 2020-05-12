
class Summary extends React.Component{


const {selectedProducts}=this.props;
var Subtotal =selectedProducts.length>0?selectedProducts.reduce((acc,prod)=> acc+prod.price*prod.qty,0):0; 
var ITBis=Subtotal>0?Subtotal*0.18:0;


return(

        <div className="row">
          <div className="col-sm-6"></div>
          <div className="col-sm-6">
            <div className="row">
              <div className="col-sm-6"></div>
              <div className="col-sm-6"></div>
            </div>

            <div className="row mt-2 ">
              <div className="col-sm-6">Subtotal</div>
              <div className="col-sm-6">{Subtotal}</div>
            </div>

            <div className="row">
              <div className="col-sm-6">ITBis 18%</div>
              <div className="col-sm-6">{ITBis}</div>
            </div>
            <div className="row">
              <div className="col-sm-6">Total</div>
              <div className="col-sm-6">{ITBis+Subtotal}</div>
            </div>
          </div>
        </div>
)
}



class Product extends React.Component {
constructor(){
super()
this.delete=this.delete.bind(this)
}
delete(){
this.props.deleteSelectedProduct(this.props.id);
}
  render() {
    return (
      <li className=" py-0 mt-1 list-group-item ">
        <div className="row">
          <div className="col-sm-4">
          <div className="form-group">
            <label className="mb-0" htmlFor="clientName">
              Nombre
            </label>
            <input readOnly={true} value={this.props.name} type="text" className="form-control" aria-label="Small" />
          </div>
           </div>
          <div className="col-sm-2">
          <div className="form-group">
            <label className="mb-0" htmlFor="clientName">
              precio
            </label>
            <input readOnly={true} value={this.props.price} type="number" className="form-control" aria-label="Small" />
          </div>
           </div>
          <div className="col-sm-2">
          <div className="form-group">
            <label className="mb-0" htmlFor="clientName">
              QTY
            </label>
            <input readOnly={true} value={this.props.qty} type="number" className="form-control" aria-label="Small" />
          </div>
          </div>
          <div className="col-sm-2">
           <div className="form-group">
            <label className="mb-0" htmlFor="clientName">
              Total
            </label>
            <input
            value={this.props.price*this.props.qty}
              readOnly={true}
              type="number"
              className="form-control"
              aria-label="Small"
            />
          </div>
          </div>
          <div className="col-sm-2">
          <div className="form-group">
            <label className=" text-muted mb-0" >
              Accion
            </label>
            <button 
            onClick={this.delete}
            className=" d-block btn btn-danger">
              <i className="fa fa-trash"></i>
            </button>
          </div>
          </div>
        </div>
      </li>
    )
  }
}
class ProductAdder extends React.Component{

  render(){
    return(
    <div className=" bg-info py-0 mt-1 list-group-item ">
        <div className="row">
          <div className="col-sm-4">
          <div className="form-group">
            <label className="mb-0" htmlFor="clientName">
              Nombre
            </label>
            <select className="form-control"
            onChange={this.props.handleSelectProduct}
           
            >
              {
                 this.props.products.map(product=><option key={product.id} value={product.id}>{product.name}</option>)
              }
            </select>
          </div>
           </div>
          <div className="col-sm-2">
          <div className="form-group">
            <label className="mb-0" htmlFor="clientName">
              precio
            </label>
            <input 
            min={1}
            onChange={this.props.changePrice}
            name="price" 
            value={this.props.selectedProduct.price}
            type="number" 
            className="form-control" 
            aria-label="Small" />
          </div>
           </div>
          <div className="col-sm-2">
          <div className="form-group">
            <label className="mb-0" htmlFor="clientName">
              QTY
            </label>
            <input 
            min={1}
            onChange={this.props.changeQty}
            name="qty" 
            value={this.props.selectedProduct.qty} 
            type="number" 
            className="form-control" aria-label="Small" />
          </div>
          </div>
          <div className="col-sm-2">
           <div className="form-group">
            <label className="mb-0" htmlFor="clientName">
              Total
            </label>
            <input
            readOnly={true}
            value={this.props.selectedProduct.price*this.props.selectedProduct.qty}
              
              type="number"
              className="form-control"
              aria-label="Small"
            />
          </div>
          </div>
          <div className="col-sm-2">
          <div className="form-group">
            <label className=" text-muted mb-0" >
              Accion
            </label>
            <button 
            
            onClick={this.props.addNewSelectedProduct}
            className=" d-block btn btn-success">
              <i className="fa fa-plus"></i>
            </button>
          </div>
          </div>
        </div>
      </div>
)
}
}
class Products extends React.Component {
  render() {
    return (
      <div className="border p-1">
        <label className="badge badge-secondary p-2">
          Servicios
        </label>
      
        <ul className="list-group">
        {this.props.selectedProducts.map(product=>
        
        <Product
        deleteSelectedProduct={this.props.deleteSelectedProduct}
        key={product.id}
        {...product}
        />
        )}
        </ul>

     
      </div>
    )
  }
}













class ClientDetails extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="form-group">
          <label className="badge badge-secondary p-2">
            Informacion del cliente
          </label>
          <div className="form-group">
            <label className="mb-0" htmlFor="clientName">
              Nombre
            </label>
            <select className="form-control" name="clientName"
            onChange={this.props.handleSelectClient}
            >
              {
                 this.props.clients.map(client=><option key={client.id} value={client.id}>{client.name}</option>)
              }
            </select>
          </div>
        </div>
        
         <div className="form-group">
          <label className="mb-0">
            Telephono
          </label>
          <input readOnly={true} value={this.props.selectedClient.tel}  type="text" className="form-control mt-0" />
        </div>

        <div className="form-group">
          <label className="mb-0" htmlFor="email">
            Correo
          </label>
          <input readOnly={true} value={this.props.selectedClient.email}  type="text" className="form-control mt-0" />
        </div>

        <div className="form-group">
          <label className="mb-0" htmlFor="address">
            Dirreccion
          </label>
          <textarea readOnly={true} id="addess" className="form-control" rows="2" value={this.props.selectedClient.dirreccion}></textarea>
        </div>
      </React.Fragment>
    )
  }
}

class InvoiceDetails extends React.Component {
  render() {
    return (
      <div className="  border-dotted border-info p-2 my-3">
        <div>
            <div className="row border-dotted border-top-0 border-right-0 border-left-0 p-3 mb-5">
                <div className="col-md-6 col-sm-12">
                    <ClientDetails
                    clients={this.props.clients}
                    selectedClient={this.props.selectedClient}
                    handleSelectClient={this.props.handleSelectClient}
                    /> 
                </div>
                
               <div className="col-md-6 col-sm-12">
                <VoucherDetails
                {...this.props}
                />
               </div>
             </div>
                <div className="containsAddr">
          <ProductAdder
          changePrice={this.props.changePrice}
          changeQty={this.props.changeQty}
          addNewSelectedProduct={this.props.addNewSelectedProduct}
           handleChangeSelectProduct={this.props.handleChangeSelectProduct}
           handleSelectProduct={this.props.handleSelectProduct}
          {...this.props}
       />
       </div>
               <div className="px-1 py-2">
               <Products
               deleteSelectedProduct={this.props.deleteSelectedProduct}
               {...this.props}
               />
                </div>
                
           
        </div>
        <Summary
        selectedProducts={this.props.selectedProducts}
        />
   
      </div>
    )
  }
}



class VoucherDetails extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="form-group">
          <label htmlFor="Iformacion" className="badge badge-secondary p-2">
            Informacion de la factura
          </label>
        </div>

        <div className="form-row">
          <div className="form-group col-md-6">
            <label className="mb-0" htmlFor="inputEmail4">
              Fecha
            </label>
            <div className="input-group mb-3">
              <input
                name="date"
                type="date"
                onChange={this.props.handleChange}
                className="form-control"
                aria-describedby="basic-addon2"
              />
              <div className="input-group-append">
                <span className="input-group-text" id="basic-addon2">
                  <i
                    className="fa fa-calendar
                        "
                  ></i>
                </span>
              </div>
            </div>
          </div>
          <div className="form-group col-md-6">
            <label className="mb-0">
              Numero de Factura
            </label>
            <input
              readOnly={true}
              type="text"
              className="form-control"
              value="ALIS100W0V"
            />
          </div>
        </div>

        <div className="card">
          <div className="card-header">Tipo de factura</div>
          <div className="card-body">
            <div className="form-row">
              <div className="form-group col-md-6">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="type"
                    onChange={this.props.handleChange}
                    id="Factura"
                    value="Factura"
                  />
                  <label className="form-check-label" htmlFor="inlineRadio1">
                    Factura
                  </label>
                </div>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="type"
                  id="Cotizacion"
                  value="Cotizacion"
                  onChange={this.props.handleChange}
                />
                <label className="form-check-label" htmlFor="inlineRadio2">
                  Cotizacion
                </label>
              </div>
              {this.props.comprobantes.length>0?<div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="comprobante"
                  checked={this.props.comprobante}
                  onChange={this.props.handleChange}
                />
                <label className="form-check-label" htmlFor="comprobante">
                  Con comprobante
                </label>
              </div>:
              <h6> No hay mas comprobantes disponible</h6>
              }
              {
              this.props.comprobante &&
              <Comprobantes
              {...this.props}
              handleChange={this.props.handleChange}
              />
              }
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}






class App extends React.Component {
  constructor() {
    super()
    this.state = {
        clients:[],
        products:[],
        selectedProducts:[],
        selectedProduct:{id:0,name:"",price:0,qty:0},
        selectedClient:{},
        date:'',
        type:'',
        comprobante:false,
        comprobanteComprador:'',
        comprobantes:[]
    }
    
    this.LoadClients=this.LoadClients.bind(this);
    this.LoadProducts=this.LoadProducts.bind(this);
    this.LoadComprobantes=this.LoadComprobantes.bind(this);
    this.onError=this.onError.bind(this);
    this.handleSelectClient=this.handleSelectClient.bind(this);
    this.handleChangeSelectProduct=this.handleChangeSelectProduct.bind(this)
    this.handleSelectProduct=this.handleSelectProduct.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.addNewSelectedProduct=this.addNewSelectedProduct.bind(this);
    this.deleteSelectedProduct=this.deleteSelectedProduct.bind(this)
    this.changePrice=this.changePrice.bind(this)
    this.changeQty=this.changeQty.bind(this)
    this.handleSave=this.handleSave.bind(this)
    this.handlePrint=this.handlePrint.bind(this)
    /*Never passed down */
    this.reduceComprobantes=this.reduceComprobantes.bind(this)
    this.reduceInvoice=this.reduceInvoice.bind(this)
    this.validateInfos=this.validateInfos.bind(this)
    this.reduceProduct=this.reduceProduct.bind(this);
    this.saveInvoice=this.saveInvoice.bind(this);
    this.onSuccesssaveInvoice=this.onSuccesssaveInvoice.bind(this);
    this.onSuccessPrnitInvoice=this.onSuccessPrnitInvoice.bind(this);
    
    
  }


componentDidMount(){
   google.script.run
    .withFailureHandler(this.onError)
    .withSuccessHandler(this.LoadClients)
    .getAllClientsInOBJ();
    
    google.script.run
    .withFailureHandler(this.onError)
    .withSuccessHandler(this.LoadProducts)
    .getAllServicesInOBJ();
    
    google.script.run
    .withFailureHandler(this.onError)
    .withSuccessHandler(this.LoadComprobantes)
    .getAllComprobantesInOBJ();
  }

onSuccessPrnitInvoice(e){
window.open('https://script.google.com/macros/s/AKfycby7MrKJqbO1sFCoedZH4AC7b1Rjr83Wtc3Gjua3mLi-/dev?v=invoice', '_top')
}
onSuccesssaveInvoice(e){
window.open('https://script.google.com/a/tophatter.com/macros/s/AKfycbzno6zwZ_dYKsJrs5tNSYZBoZf7lZrQ4oIyr0AbWi3vvIq0WckP/exec?v=invoices');
}
saveInvoice(data){
 google.script.run
    .withFailureHandler(this.onError)
    .withSuccessHandler(this.onSuccesssaveInvoice)
    .setInvoice(data);
}  

printInvoice(data){
google.script.run
    .withFailureHandler(this.onError)
    .withSuccessHandler(this.onSuccessPrnitInvoice)
    .setInvoice(data);
}  



handlePrint(){
if(this.validateInfos()){
var data=this.reduceInvoice(); 
this.printInvoice(data);
}
else
alert('Verifique hay campo sin llenar'); 
}

handleSave(){
if(this.validateInfos()){
var data=this.reduceInvoice(); 
this.saveInvoice(data);
}
else
console.log('Verifique hay campo sin llenar'); 
}
validateInfos(){
const{date, type,selectedClient,selectedProducts,comprobante,comprobanteComprador}= this.state;
const Val1=(date!=''&& type!=''&& selectedClient!={} && selectedProducts.length!=0);
if(comprobante)
return (Val1 && comprobanteComprador!='');
else
return Val1;
}
reduceProduct(array){
var data=[];
for(var i=0; i<array.length; i++)
data.push(array[i].id+'|'+array[i].qty+'-'+array[i].price);
return data.join();
}

reduceInvoice(){
const{date, type,selectedClient,selectedProducts,comprobante,comprobanteComprador,comprobantes}= this.state;
const {id}=selectedClient;
const productString=this.reduceProduct(selectedProducts);
const total=selectedProducts.reduce((acc,prod)=> acc+prod.price*prod.qty,0)
if(!comprobante)
return [date.toString(),id,total,type,productString];
else{
var reducedComprobante= this.reduceComprobantes();
return [date.toString(),id,total,type,productString,reducedComprobante,comprobanteComprador];
}

}
reduceComprobantes(){
const{comprobantes}= this.state;
return comprobantes[0].id+'|'+comprobantes[0].number;
}

handleChange(e){
if(e.target.type=="checkbox")
this.setState({[e.target.name]:e.target.checked})
else 
this.setState({[e.target.name]:e.target.value})

console.log('here is the date we have '+ this.state.date);

}
addNewSelectedProduct(e){

const{selectedProduct}=this.state;
if(selectedProduct.name!=""){
var all= [...this.state.selectedProducts,selectedProduct];
this.setState({selectedProducts:all},()=>{
var empty={id:0,name:"",price:0,qty:0};
console.log("Done affecting");
this.setState({selectedProduct:empty});
});}
else
alert('Selecionar un prducto para agregar');
}

deleteSelectedProduct(id){
var goodProducts = this.state.selectedProducts.filter(product=> product.id!=id);
this.setState({selectedProducts:goodProducts});
}



handleChangeSelectProduct(e){
this.setState({...this.state.selectedProduct,[e.target.name]:e.target.value});
}
changePrice(e){
var newProd= this.state.selectedProduct; 
newProd.price=e.target.value; 
console.log(newProd);
this.setState({selectedProduct:newProd})
}
changeQty(e){
var newProd= this.state.selectedProduct; 
newProd.qty=e.target.value; 
console.log(newProd);
this.setState({selectedProduct:newProd})
}

handleSelectProduct(e){
var select = this.state.products.filter(product=> product.id==e.target.value);
this.setState({selectedProduct:select[0]});
}
handleSelectClient(e){
var select = this.state.clients.filter(client=> client.id==e.target.value);
this.setState({selectedClient:select[0]});
}

LoadComprobantes(e){

if(e[0].id!="")
this.setState({comprobantes:e});
}

LoadClients (e){
var v=[{name:"", id:0,tel:"",email:"",dirreccion:""},...e]
this.setState({clients:v});
}

LoadProducts(e){
var allProduct=[{name:"", id:0,tel:"",email:"",dirreccion:""},...e];
this.setState({products:allProduct});
}
onError(e){alert('Problemas con los servidores de google Trata mas tarde APP01'+e)}

render() {
    return (
      <div>
       
        <div className="container">
          <div className="row">
            <div className="col ">
              <h5 className="h5">Crear Facturas</h5>
            </div>
            <div className="col d-flex justify-content-end mb-2">
              <button
              onClick={this.handleSave}
              type="button" className="btn mr-1 btn-info">
                <i className="mr-1 fa fa-save"></i> Guardar
              </button>
              <button 
              onClick={this.handlePrint}
              type="button" className="btn mr-1 btn-primary">
                <i className="mr-1 fa fa-print"></i>Imprimir
              </button>
              <button type="button" disabled={true}className="btn mr-1 btn-warning">
                <i className="mr-1 fa fa-send"></i>Enviar
              </button>
            </div>
          </div>
          <InvoiceDetails 
          {...this.state}
         
          changeQty={this.changeQty}
          changePrice={this.changePrice}
          handleChangeSelectProduct={this.handleChangeSelectProduct}
          handleSelectProduct={this.handleSelectProduct}
          handleChange={this.handleChange}
          handleSelectClient={this.handleSelectClient}
          addNewSelectedProduct={this.addNewSelectedProduct}
          deleteSelectedProduct={this.deleteSelectedProduct}
          />
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))

 </script>
