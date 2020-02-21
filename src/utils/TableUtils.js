import React from "react";
import {IconButton} from "@material-ui/core";
import {KeyboardArrowLeft, KeyboardArrowRight} from "@material-ui/icons";
import PropTypes from "prop-types";

let rowsPerPage = 8;
function TablePaginationActions(props) {
    let {page, count, onChangePage} = props;

    let nextPage = (event) => {
        onChangePage(event, page + 1);
    };

    let previousPage = (event) => {
        onChangePage(event, page - 1);
    };

    return (
        <div style={{flexShrink: 0, display: 'flex', flexDirection: 'row'}}>
            <IconButton onClick={previousPage} disabled={page === 0} aria-label='previous page'>
                <KeyboardArrowLeft />
            </IconButton>
            <p>Page: {page+1}</p>
            <IconButton onClick={nextPage} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label='next page'>
                <KeyboardArrowRight />
            </IconButton>
        </div>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired
};

export {TablePaginationActions, rowsPerPage};