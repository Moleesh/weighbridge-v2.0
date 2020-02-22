package com.babulens.weighbridge.repository;

import com.babulens.weighbridge.model.entity.WebCamDetail;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WebCamDetailDAO extends CrudRepository<WebCamDetail, String> {

	WebCamDetail findFirstByMyPrimaryIsTrue();

}
