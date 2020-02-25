package com.babulens.weighbridge.repository;

import com.babulens.weighbridge.model.entity.Material;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MaterialDAO extends CrudRepository<Material, Integer> {
}
