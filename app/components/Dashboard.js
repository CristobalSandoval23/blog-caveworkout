import { Modal } from "./Modal.js";
import { Table } from "./Table.js";
import { User_Categories_Post } from "./User_Categories_Post.js";

export function Dashboard(){
    const $dashboard = document.createElement("div");

    $dashboard.appendChild(Modal());
    $dashboard.appendChild(Table());
    $dashboard.appendChild(User_Categories_Post());

    return $dashboard;
}