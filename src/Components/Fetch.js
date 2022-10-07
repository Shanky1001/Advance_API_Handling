import { Button, Card, DisplayText, Select, TextField } from "@shopify/polaris";
import React, { useCallback, useEffect, useState } from "react";
import "../App.css";
import { useFetch } from '../useFetch'

const Fetch = () => {

    // fetching data from API using custom hook
    let [data, data1, extractDataFromApi] = useFetch([]);

    // State to store the value of select Boxes
    let [selected, setSelected] = useState([]);

    // State to store options for every select box at each index
    let [opt, setOpt] = useState([]);

    // State for parent Id to fetch from first API
    let [parentId, setParentId] = useState([]);

    // State to Check when second api is calling
    let [secondApi, setSecondApi] = useState(false);

    // state to set when to fetch from second API from custom hook
    const [condition, setCondition] = useState(true);

    // Statee to render select from second API
    const [count, setCount] = useState([]);

    // state to store value from select boxes of second API
    const [selected1, setSelected1] = useState([]);

    // State to show input on chnge of select box
    const [inptDisp, setInptDisp] = useState(false);

    // State to store input value of input field 
    const [value, setValue] = useState([]);


    // to fetch data from first API on every call
    useEffect(() => {
        let url =
            "https://multi-account.sellernext.com/home/public/connector/profile/getAllCategory/";

        let payload = {
            target_marketplace: "eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9",
            selected: { ...parentId },
            user_id: "63329d7f0451c074aa0e15a8",
            target: {
                marketplace: "amazon",
                shopId: "530",
            },
        };
        extractDataFromApi(url, payload, condition);
    }, [parentId]);


    // to set options of select boxes in a OPT array
    useEffect(() => {
        setOpt([...opt, { ind: option }]);
    }, [data]);


    // Function to handle each select box dynamically
    const handleDynamicSelect = useCallback(
        (val, ind) => {
            if (ind < opt.length) {
                setOpt(opt.splice(0, ind));
                setSelected(selected.splice(ind + 1));
            } else
                data.forEach((item, i) => {
                    if (val === item.name) {
                        if (item.hasChildren) {
                            setParentId(item.parent_id);
                        } else {
                            setSecondApi(true);
                            setCondition(false);
                            extractDataFromApi(
                                "https://multi-account.sellernext.com/home/public/connector/profile/getCategoryAttributes/",
                                {
                                    data: {
                                        barcode_exemption: false,
                                        browser_node_id: item.browseNodeId,
                                        category: item.category["primary-category"],
                                        sub_category: item.category["sub-category"],
                                    },
                                    source: {
                                        marketplace: "shopify",
                                        shopId: "500",
                                    },
                                    target_marketplace:
                                        "eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9",
                                    user_id: "63329d7f0451c074aa0e15a8",
                                    target: {
                                        marketplace: "amazon",
                                        shopId: "530",
                                    },
                                },
                                false
                            );
                        }
                    }
                });
            selected.push(val);
        },
        [opt, data1]
    );

    // Function to add attribute 
    const addAttr = () => {
        setCount([...count, 1]);
    };

    // Options for Dynamic Select Boxes
    let option =
        data.length !== 0
            ? data.map((item) => ({
                label: item.name,
                value: item.name,
            }))
            : [{ label: "Nothind to display", value: "Nothing to display" }];

    const [option1, setOption1] = useState()
    useEffect(() => {
        let opt2 = [];
        if (data1 !== "") {
            for (var property in data1) {
                let obj = data1[property];
                for (var property1 in obj) {
                    let label = obj[property1].label;
                    opt2 = [...opt2, { label: label, value: property1 }]
                }
            }
            setOption1([...opt2]);
        }
    }, [data1])


    // function to handle dynamic select boxes from second API
    const handleChange = (val, index) => {
        setSelected1([...selected1, val]);
        option1.forEach((item) => {
            if (val === item.value) {
                item.disabled = true;
            }
        })
        setOption1(option1)
        setInptDisp(true);
    };

    // function to delete select boxes
    const handleDel = (i) => {
        count.splice(i, 1);
        selected1.splice(i, 1)
        value.splice(i, 1);
        option1.forEach((item) => {
            selected1.forEach((item1) => {
                if (item1 === item.value) {
                    item.disabled = true;
                } else item.disabled = false;
            })
        })
        setOption1(option1)
        setCount([...count])
        setSelected1([...selected1])
    }

    return (
        <div className="App">
            <DisplayText element="h1" size="extraLarge">
                Category and Attributes
            </DisplayText>
            <br />
            <Card sectioned title="CATEGORIES">
                {opt.length !== 0
                    ? opt.map((val, i) => {
                        if (i > 0)
                            return (
                                <span key={i}>
                                    <Select
                                        id={i + 1}
                                        placeholder="Select Cateogory"
                                        label={selected[i - 1] ? selected[i - 1] : "Category"}
                                        options={opt[i].ind}
                                        hasRequired
                                        value={selected[i - 1]}
                                        onChange={(val, ind) => handleDynamicSelect(val, ind)}
                                    />
                                    <br />
                                </span>
                            );
                    })
                    : ""}
            </Card>
            {secondApi ? (
                <>
                    {count.map((val, i) => {
                        return (
                            <Card key={i} sectioned title="ATTRIBUTES">
                                <span>
                                    <div id={i} className="delete">
                                        <Button id={i} plain onClick={() => handleDel(i)}>Delete</Button>
                                    </div>
                                    <Select
                                        id={i + 1}
                                        placeholder="Select Attribute"
                                        label={selected1[i] ? selected1[i] : "Category"}
                                        options={option1}
                                        disabled={selected1[i] && true}
                                        hasRequired
                                        value={selected1[i]}
                                        onChange={(val, ind) => handleChange(val, ind)}
                                    />

                                    <br />

                                    {inptDisp && (
                                        <TextField
                                            value={value[i]}
                                            onChange={(val) => setValue((v) => {
                                                v[i] = val
                                                return [...v]
                                            })}
                                        />
                                    )}
                                </span>
                            </Card>
                        );
                    })}
                    <br />
                    <Button primary onClick={() => addAttr()}>
                        Add Attribute
                    </Button>
                </>
            ) : (
                ""
            )}
        </div>
    );
};

export default Fetch;
