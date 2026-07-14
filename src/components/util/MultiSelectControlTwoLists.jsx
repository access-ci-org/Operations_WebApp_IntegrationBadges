import React, {useContext, useRef, useState} from 'react';
import Form from "react-bootstrap/Form";
import {AccordionContext, useAccordionButton} from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import {InlineAlert} from "./InlineAlerts.jsx";

/**
 * Multi select control with two lists
 * @param items [{id, label}]
 * @param value [{id, required}]
 * @param onChange
 * @param onItemExpand
 * @param filterLabel
 * @returns {JSX.Element}
 * @constructor
 */
export default function MultiSelectControlTwoLists(
    {
        items, value = [],
        onChange, onItemExpand,
        filterLabel = "Filter",
        addedItemsLabel = "Added Items",
        icon = <i className="bi bi-circle-fill fs-3"></i>,
        allowAdd = true,
        allowRemove = true,
        allowEdit = false,
        allowRequiredSwitch = true,
        rightPanelStyles = {
            paddingTop: "0px"
        },
        leftPanelStyles = {
            paddingTop: "0px"
        },
        showRightPanelIcon = true,
        showLeftPanelIcon = true,
        enableOrdering = false,
        enableViewMoreDetails = false,
        getMoreDetailsComponent = (item) => null,
        onEditClick = (item) => null
    }) {

    const [searchText, setSearchText] = useState("");

    const dragItem = useRef(null);
    const draggedOverItem = useRef(null);

    const handleDragStart = (e, index) => {
        dragItem.current = index;
    };

    const handleDragEnter = (e, index) => {
        draggedOverItem.current = index;
    };

    const handleSort = () => {
        const newItems = [...value];
        const draggedItemContent = newItems[dragItem.current];
        newItems.splice(dragItem.current, 1); // Remove dragged item
        newItems.splice(draggedOverItem.current, 0, draggedItemContent); // Insert at new position

        dragItem.current = null;
        draggedOverItem.current = null;
        onChange(newItems);
    };

    const isItemSelected = {};
    const isItemRequired = {};
    const itemMap = {};

    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        itemMap[item.id] = item;
    }

    for (let i = 0; i < value.length; i++) {
        const {id, required} = value[i];
        isItemSelected[id] = true;
        isItemRequired[id] = required;
    }

    const notSelectedItems = items.filter(item => !isItemSelected[item.id]).filter(item => item.label.toLowerCase().includes(searchText));
    const selectedItems = value.map(({id}) => itemMap[id]);

    const addItemToSequence = ({id, required = false, sequenceNo = selectedItems.length}) => {
        const _value = [...value];
        _value.splice(sequenceNo, 0, {id, required});
        onChange && onChange(_value);
    }

    const removeItemFromSequence = ({sequenceNo}) => {
        const _value = [...value];
        _value.splice(sequenceNo, 1);
        onChange(_value);
    }

    const toggleItemRequiredStatus = ({sequenceNo}) => {
        const _value = [...value];
        _value[sequenceNo].required = !_value[sequenceNo].required;
        onChange(_value);
    }

    function getItemNameJsx(item) {
        // const renderTooltip = (props) => (
        //     <Tooltip {...props}>
        //         {item.label}
        //     </Tooltip>
        // );

        // return <OverlayTrigger placement="bottom-start" overlay={renderTooltip}>
        return <div className="flex-fill align-content-center ps-2 pe-2 text-gray-800 text-one-line-overflow-ellipsis">
            {item.label}
        </div>
        //</OverlayTrigger>;
    }

    function ItemLeftActions(
        {item, showIcon = true, enableOrdering = false, enableViewMoreDetails = false} = {}) {

        const eventKey = item.id;
        const currentEventKey = useContext(AccordionContext).activeEventKey;
        const decoratedOnClick = useAccordionButton(eventKey, () =>
            console.log('totally custom!', [eventKey]),
        );

        return <div className="text-gray-400 align-content-center ps-1 pe-1 d-flex flex-row">
            {!!enableOrdering &&
                <button className="btn btn-link ps-1 pe-1"><i className="bi bi-grip-vertical fs-5"></i></button>}
            {!!enableViewMoreDetails && <button type="button" className="btn btn-link text-primary ps-1 pe-1"
                                                onClick={decoratedOnClick}>
                {currentEventKey === eventKey ? <i className="bi bi-caret-down-fill"></i> :
                    <i className="bi bi-caret-up-fill"></i>}
            </button>}
            {!!showIcon && <div style={{lineHeight: "20px", height: "20px"}} className="ps-1 pe-1">{icon}</div>}
        </div>;
    }

    function ItemRightActions({item, sequenceNo}) {
        const currentEventKey = useContext(AccordionContext).activeEventKey;
        return <>
            {!!allowRequiredSwitch && currentEventKey !== item.id && <div className="align-content-center ps-2 pe-2">
                <Form.Check type="switch" id={`item-required-switch-${item.id}`} label=""
                            checked={!!isItemRequired[item.id]}
                            onChange={toggleItemRequiredStatus.bind(this, {sequenceNo})}/>
            </div>}
            {!!allowEdit && <div style={{minWidth: "50px"}} className="pe-2 text-end">
                <button className="btn btn-link fw-normal" onClick={onEditClick.bind(this, item)}>Edit</button>
            </div>}
            {!!allowRemove && <button className="btn btn-link"
                                      onClick={removeItemFromSequence.bind(this, {sequenceNo})}>
                <i className="bi bi-dash-square fs-5 text-gray-700"></i>
            </button>}
        </>
    }

    return <div className="row pb-5" style={{height: "500px"}}>
        <div className="col-sm-6 pe-sm-5 h-100">
            <div className="w-100 h-100 d-flex flex-column" style={leftPanelStyles}>
                <div className="w-100 pe-5" style={{minHeight: "60px"}}>
                    <div className="input-group search-input input-group-sm">
                        <span className="input-group-text rounded-start-5">
                            <i className="bi bi-search"></i>
                        </span>
                        <input type="text" className="form-control rounded-end-5"
                               placeholder={filterLabel} value={searchText}
                               aria-label={filterLabel} onChange={(e) => setSearchText(e.target.value.toLowerCase())}/>
                    </div>
                </div>
                <div className="flex-fill overflow-auto">
                    {notSelectedItems.length === 0 &&
                        <InlineAlert variant="green" title="None"/>}
                    <ul className="list-unstyled ">
                        {notSelectedItems.map((item, sequenceNo) => {
                            return <li key={sequenceNo} className="p-0">
                                <div
                                    className="d-flex flex-row rounded-1 border border-1 border-gray-300 pt-2 pb-2 ps-2 pe-3">
                                    <ItemLeftActions item={item} sequenceNo={sequenceNo}
                                                     showIcon={!!showLeftPanelIcon}/>
                                    {getItemNameJsx(item)}
                                    {allowAdd && <button className="btn btn-link"
                                                         onClick={addItemToSequence.bind(this, {id: item.id})}>
                                        <i className="bi bi-plus-square fs-5 text-gray-700"></i>
                                    </button>}
                                </div>
                            </li>
                        })}
                    </ul>
                </div>
            </div>
        </div>
        <div className="col-sm-6 ps-sm-5 h-100 border-start border-1 border-black">
            <div className="w-100 h-100 d-flex flex-column" style={rightPanelStyles}>
                <div className="w-100 d-flex flex-row p-3" style={{minHeight: "60px"}}>
                    <h3 className="flex-fill coming-soon-regular text-black">{addedItemsLabel}</h3>
                    {allowRequiredSwitch &&
                        <div style={{paddingRight: 5 + (allowRemove ? 20 : 0) + (allowEdit ? 50 : 0)}}>
                            <small className="coming-soon-regular">Required?</small>
                        </div>}
                </div>
                <Accordion defaultActiveKey="" className="flex-fill overflow-auto">
                    {selectedItems.length === 0 &&
                        <InlineAlert variant="green" title="None"/>}
                    <ul className="list-unstyled">
                        {selectedItems.map((item, sequenceNo) => <li
                            key={sequenceNo} className="p-0"
                            draggable={enableOrdering}
                            onDragStart={(e) => handleDragStart(e, sequenceNo)}
                            onDragEnter={(e) => handleDragEnter(e, sequenceNo)}
                            onDragEnd={handleSort}
                            onDragOver={(e) => e.preventDefault()} // Allow dropping
                        >
                            <div className="rounded-1 border border-1 border-gray-300 pt-2 pb-2 ps-2 pe-3">
                                <div className="w-100 d-flex flex-row">
                                    <ItemLeftActions item={item} sequenceNo={sequenceNo} showIcon={!!showRightPanelIcon}
                                                     enableOrdering={!!enableOrdering}
                                                     enableViewMoreDetails={!!enableViewMoreDetails}/>
                                    {getItemNameJsx(item)}
                                    <ItemRightActions item={item} sequenceNo={sequenceNo}/>
                                </div>
                                <Accordion.Collapse eventKey={item.id}>
                                    <div
                                        className="w-100 p-3 mt-3 border-top border-1">{getMoreDetailsComponent(item)}</div>
                                </Accordion.Collapse>
                            </div>
                        </li>)}
                    </ul>
                </Accordion>
            </div>
        </div>
    </div>
}
