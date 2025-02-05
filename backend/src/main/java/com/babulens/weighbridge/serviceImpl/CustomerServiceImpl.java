package com.babulens.weighbridge.serviceImpl;

import com.babulens.weighbridge.model.entity.Customer;
import com.babulens.weighbridge.repository.CustomerDAO;
import com.babulens.weighbridge.service.CustomerService;
import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerServiceImpl implements CustomerService {

    private final
    CustomerDAO customerDAO;

    @Autowired
    public CustomerServiceImpl(CustomerDAO customerDAO) {
        this.customerDAO = customerDAO;
    }

    @Override
    @Cacheable(cacheNames = "Customers")
    public List<Customer> getAllCustomers() {
        return Lists.newArrayList(customerDAO.findAll());
    }

    @Override
    @CacheEvict(value = "Customers", allEntries = true)
    public Customer addUpdateCustomer(Customer customer) {
        return customerDAO.save(customer);
    }

    @Override
    @CacheEvict(value = "Customers", allEntries = true)
    public void deleteCustomer(int id) {
        customerDAO.deleteById(id);
    }

}
