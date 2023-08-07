import React, {useState} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import fetcher from "./fetcher";
import { useEffect } from 'react';
import {components} from "./openapi-schema";


type Widget = components["schemas"]["Widget"];


function App() {

  const [widgetId, setWidgetId] = useState<number>(-1);
  const [name, setName] = useState<string>("");
  const [manufacturer, setManufacturer] = useState<string>("");
  const [stock, setStock] = useState<number>(0);
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [editing, setEditing] = useState<boolean>(false);


  useEffect(() => {
    fetcher.listWidgets({}).then(
        (response) => {
            setWidgets(response.data)  // TODO: Handle pagination
        }
    )
  }, [])

  const clear = () => {
    setWidgetId(-1)
    setName("")
    setManufacturer("")
    setStock(0)
    setEditing(false)
  }

  const add = () => {
      if (!validate()) {
          return
      }
      fetcher.createWidget({
        "name": name,
        "manufacturer": manufacturer,
        "stock": stock
      }).then((response) => {
          let updated = [...widgets]
          // TODO: Push into appropriate ordered position in the list
          updated.push(response.data)
          setWidgets(updated)
          clear();
      }, handleErrors)
  }

  const validate = () => {
      // TODO: Do something nicer than modal alerts
      if (name === "" || manufacturer === "" || stock < 0) {
          alert("Name, Manufacturer and Non-Negative Stock Level are required")
          return false
      }
      return true
  }

  const showEdit = (target: any) => {
    setEditing(true);
    setWidgetId(target.dataset.widgetid);
    setName(target.dataset.name);
    setManufacturer(target.dataset.manufacturer);
    setStock(target.dataset.stock)
  }

  const edit = () => {
    if (!validate()) {
      return
    }
    // TODO: Could patch changed fields only
    fetcher.updateWidget({
      "id": widgetId,
      "name": name,
      "manufacturer": manufacturer,
      "stock": stock
    }).then((response) => {
        let updated: Widget[] = []
        for (let widget of widgets) {
              if (widget.id === response.data.id) {
                  updated.push(response.data)
              } else {
                  updated.push(widget)
              }
        }
        setWidgets(updated);
        clear();
    }, handleErrors)
  }

  const del = (target: any) => {
    // TODO: Use something a bit nice than a modal dialog
    if (window.confirm(`Are you sure you want to delete ${target.dataset.name}?`)) {
        fetcher.deleteWidget({id: target.dataset.widgetid.toString()}).then((response) => {
            let updated: Widget[] = []
            for (let widget of widgets) {
                if (widget.id !== parseInt(target.dataset.widgetid)) {
                    updated.push(widget)
                }
            }
            setWidgets(updated);
        }, handleErrors)
    }
  }

  const updateStock = (stock: number) => {
    if (Number.isInteger(stock) && stock >= 0) {
      setStock(stock);
    }
  }

  const handleErrors = (error: any) => {
      console.log(error)
      alert("Woops, something went wrong!") // TODO: Better error handling
  }

  // TODO: Handle pagination and make it look pretty
  // TODO: Split up into smaller components
  return (
    <div className="App">
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell><b>Name</b></TableCell>
            <TableCell><b>Manufacturer</b></TableCell>
            <TableCell><b>Stock Level</b></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {widgets.map((widget: Widget) => (
            <TableRow key={widget.id}>
              <TableCell>{widget.name}</TableCell>
              <TableCell>{widget.manufacturer}</TableCell>
              <TableCell>{widget.stock}</TableCell>
              <TableCell align="right">
                  <Button
                    data-widgetid={widget.id}
                    data-name={widget.name}
                    data-manufacturer={widget.manufacturer}
                    data-stock={widget.stock}
                    onClick={(event) => {showEdit(event.target)}}>
                    Edit
                  </Button>
              </TableCell>
              <TableCell align="right">
                  <Button
                    data-widgetid={widget.id}
                    data-name={widget.name}
                    onClick={(event) => {del(event.target)}}>
                    Delete
                  </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <br/>
      <TextField onChange={(event) => setName(event.target.value)} label={"Name"}
       value={name}/>
      <TextField onChange={(event) => setManufacturer(event.target.value)}
                 label={"Manufacturer"} value={manufacturer}/>
      <TextField onChange={(event) => updateStock(parseInt(event.target.value))}
                 type={"number"}
                 label={"Stock Level"} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                 value={stock}/>
      {(editing ? (<span><Button onClick={edit}>Update</Button><Button onClick={clear}>Cancel</Button></span>) :
        <Button onClick={add}>Add</Button>)}
    </div>
  );
}

export default App;
