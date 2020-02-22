package com.babulens.weighbridge.repository;

import com.babulens.weighbridge.model.entity.SerialPortDetails;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SerialPortSettingsDAO extends CrudRepository<SerialPortDetails, String> {
}
