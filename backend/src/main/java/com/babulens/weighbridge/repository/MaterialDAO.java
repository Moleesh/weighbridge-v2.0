package com.babulens.weighbridge.repository;

import com.babulens.weighbridge.model.Material;
import org.omg.CORBA.INTERNAL;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import sun.awt.image.IntegerComponentRaster;

@Repository
public interface MaterialDAO extends CrudRepository<Material, Integer> {
}
