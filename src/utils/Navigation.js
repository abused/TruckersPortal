import React from "react";
import {ListItem, ListItemIcon, ListItemText, Typography} from "@material-ui/core";
import {Create, Dashboard, LocalShipping, NoteAdd, People, RecentActors, Settings} from "@material-ui/icons";
import DashboardScreen from "../screens/DashboardScreen";
import LoadsScreen from "../screens/LoadsScreen";
import DriversScreen from "../screens/DriversScreen";
import CreateInvoiceScreen from "../screens/CreateInvoiceScreen";

let Navigation = [
    {
        name: 'Dashboard',
        screen: DashboardScreen,
        icon: Dashboard
    },
    {
        name: 'Loads',
        screen: LoadsScreen,
        icon: LocalShipping
    },
    {
        name: 'Drivers',
        screen: DriversScreen,
        icon: RecentActors
    },
    {
        name: 'Create Invoice',
        screen: CreateInvoiceScreen,
        icon: NoteAdd
    },
    {
        name: 'Users',
        screen: null,
        icon: People
    },
    {
        name: 'Settings',
        screen: null,
        icon: Settings
    }
];

function renderNavigation(navigate, classes, active) {
    return Navigation.map(option => {
        let screen = option.screen;
        let name = option.name;
        let Icon = option.icon;

        return (
            <ListItem button key={name} className={classes.navListItem} selected={active === name} onClick={() => navigate(screen, name)}>
                <ListItemIcon><Typography color='textSecondary'><Icon /></Typography></ListItemIcon>
                <ListItemText><Typography color='textSecondary'>{name}</Typography></ListItemText>
            </ListItem>
        );
    });
}

export {Navigation, renderNavigation};