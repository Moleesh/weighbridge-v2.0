package com.babulens.weighbridge.controller;

import com.babulens.weighbridge.model.Material;
import com.babulens.weighbridge.model.Weight;
import com.babulens.weighbridge.service.MaterialService;
import com.babulens.weighbridge.service.WeighService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin(origins = "*")
@RestController
public class Controller {

    @Autowired
    WeighService weighService;

    @Autowired
    MaterialService materialService;
    int count =1;
    @RequestMapping(value = "/getNextSlipNo")
    public int getNextSlipNo() { return count ++;
    }

    @RequestMapping(value = "/getNextWeight")
    public int getNextWeight() { return (int)(Math.random() * 10000 + 1);
    }
    @RequestMapping(value = "/saveWeight", method = {RequestMethod.POST})
    public void saveWeight(@RequestBody Weight weight) {
        weighService.saveWeight(weight);
    }

    @RequestMapping(value = "/getWeight")
    public Weight getWeight(@RequestParam("slipNo") int slipNo) {
        return weighService.getWeight(slipNo);
    }

    @RequestMapping(value = "/getAllMaterial")
    public List<Material> getAllMaterial() {
        return materialService.getAllMaterial();
    }

    @RequestMapping(value = "/addUpdateMaterial", method = {RequestMethod.POST, RequestMethod.PUT})
    public Material addUpdateMaterial(@RequestBody Material material) {
        return materialService.addUpdateMaterial(material);
    }

    @RequestMapping(value = "/deleteMaterial", method = {RequestMethod.DELETE})
    public void deleteMaterial(@RequestParam("id") int id) {
        materialService.deleteMaterial(id);
    }

//    @RequestMapping(value = "/getAllDrivers")
//    public List<Drivers> getAllDrivers() {
//        return driversService.getAllDrivers();
//    }
//
//    @RequestMapping(value = "/addUpdateDrivers", method = {RequestMethod.POST, RequestMethod.PUT})
//    public Drivers addUpdateDrivers(@RequestBody Drivers drivers) {
//        return driversService.addUpdateDrivers(drivers);
//    }
//
//    @RequestMapping(value = "/deleteDrivers", method = {RequestMethod.DELETE})
//    public void deleteDrivers(@RequestParam("id") int id) {
//        driversService.deleteDrivers(id);
//    }
//
//    @RequestMapping(value = "/getAllTareWeights")
//    public List<TareWeights> getAllTareWeights() {
//        return tareWeightsService.getAllTareWeights();
//    }
//
//    @RequestMapping(value = "/addUpdateTareWeights", method = {RequestMethod.POST, RequestMethod.PUT})
//    public TareWeights addUpdateTareWeights(@RequestBody TareWeights tareWeights) {
//        return tareWeightsService.addUpdateTareWeights(tareWeights);
//    }
//
//    @RequestMapping(value = "/deleteTareWeights", method = {RequestMethod.DELETE})
//    public void deleteTareWeights(@RequestParam("id") int id) {
//        tareWeightsService.deleteTareWeights(id);
//    }

}
