package com.babulens.weighbridge.service;

import com.babulens.weighbridge.model.entity.Customer;

import java.util.List;

public interface CustomerService {

    List<Customer> getAllCustomers();

    Customer addUpdateCustomer(Customer customer);

    void deleteCustomer(int id);

}
