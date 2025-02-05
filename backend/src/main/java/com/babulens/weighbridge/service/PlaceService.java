package com.babulens.weighbridge.service;

import com.babulens.weighbridge.model.entity.Place;

import java.util.List;

public interface PlaceService {

    List<Place> getAllPlaces();

    Place addUpdatePlace(Place place);

    void deletePlace(int id);

}
