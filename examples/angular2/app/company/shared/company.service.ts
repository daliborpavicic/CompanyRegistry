import {Injectable} from "@angular/core";

@Injectable()
export class CompanyService {

    getCompanies() {
        return COMPANIES;
    }
}

const COMPANIES = [
    {"_id": "000", "pib": "000", "name":"Univer Export", "phoneNumber":"021/666-888", "email":"univer@gmail.com"},
    {"_id": "111", "pib": "111", "name":"CMarket", "phoneNumber":"021/333-666", "email":"market@gmail.com"},
    {"_id": "222", "pib": "222", "name":"Roda", "phoneNumber":"021/111-999", "email":"roda@gmail.com"},
    {"_id": "333", "pib": "333", "name":"Idea", "phoneNumber":"021/555-000", "email":"idea@gmail.com"},
    {"_id": "444", "pib": "444", "name":"Tempo", "phoneNumber":"021/222-444", "email":"tempo@gmail.com"}
];