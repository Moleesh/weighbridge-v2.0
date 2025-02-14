package com.babulens.weighbridge.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import java.util.Objects;

@Entity
public class AdminSetting {
    @Id
    @Column(name = "SQNO")
    private String key;
    @Column(name = "_VALUE")
    private String value;

    public AdminSetting() {
    }

    public AdminSetting(String key, Object value) {
        this.key = key;
        this.value = value.toString();
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getValue() {
        return value;
    }

    public void setValue(Object value) {
        this.value = value.toString();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        AdminSetting settings = (AdminSetting) o;
        return Objects.equals(key, settings.key);
    }

    @Override
    public int hashCode() {
        return Objects.hash(key);
    }

}
