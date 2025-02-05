package com.babulens.weighbridge.serviceImpl;

import com.babulens.weighbridge.model.entity.Place;
import com.babulens.weighbridge.repository.PlaceDAO;
import com.babulens.weighbridge.service.PlaceService;
import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlaceServiceImpl implements PlaceService {

    private final
    PlaceDAO placeDAO;

    @Autowired
    public PlaceServiceImpl(PlaceDAO placeDAO) {
        this.placeDAO = placeDAO;
    }

    @Override
    @Cacheable(cacheNames = "Places")
    public List<Place> getAllPlaces() {
        return Lists.newArrayList(placeDAO.findAll());
    }

    @Override
    @CacheEvict(value = "Places", allEntries = true)
    public Place addUpdatePlace(Place place) {
        return placeDAO.save(place);
    }

    @Override
    @CacheEvict(value = "Places", allEntries = true)
    public void deletePlace(int id) {
        placeDAO.deleteById(id);
    }

}
