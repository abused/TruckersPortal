import React from "react";
import {ListItem, ListItemIcon, ListItemText, Typography} from "@material-ui/core";
import {Create, Dashboard, LocalShipping, NoteAdd, People, RecentActors, Settings} from "@material-ui/icons";

let Navigation = [
    {
        name: 'Dashboard',
        screen: null,
        icon: Dashboard
    },
    {
        name: 'Loads',
        screen: null,
        icon: LocalShipping
    },
    {
        name: 'Drivers',
        screen: null,
        icon: RecentActors
    },
    {
        name: 'Create Invoice',
        screen: null,
        icon: NoteAdd
    },
    {
        name: 'Sign Document',
        screen: null,
        icon: Create
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

function renderNavigation() {
    return Navigation.map(option => {
        let name = option.name;
        let Icon = option.icon;

        return (
            <ListItem button key={name}>
                <ListItemIcon><Typography color='textSecondary'><Icon /></Typography></ListItemIcon>
                <ListItemText><Typography color='textSecondary'>{name}</Typography></ListItemText>
            </ListItem>
        );
    });
}

export {Navigation, renderNavigation};