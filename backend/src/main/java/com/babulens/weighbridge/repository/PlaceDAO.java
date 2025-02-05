package com.babulens.weighbridge.repository;

import com.babulens.weighbridge.model.entity.Place;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlaceDAO extends CrudRepository<Place, Integer> {
}
