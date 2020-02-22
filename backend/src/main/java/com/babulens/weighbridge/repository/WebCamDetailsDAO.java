package com.babulens.weighbridge.repository;

import com.babulens.weighbridge.model.entity.WebCamDetails;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WebCamDetailsDAO extends CrudRepository<WebCamDetails, String> {
	WebCamDetails findByMyPrimaryIsTrue();
}
