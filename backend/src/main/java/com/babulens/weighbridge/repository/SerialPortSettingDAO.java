package com.babulens.weighbridge.repository;

import com.babulens.weighbridge.model.entity.SerialPortDetail;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SerialPortSettingDAO extends CrudRepository<SerialPortDetail, String> {
}
