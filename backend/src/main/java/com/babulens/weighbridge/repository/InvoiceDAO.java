package com.babulens.weighbridge.repository;

import com.babulens.weighbridge.model.entity.Invoice;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface InvoiceDAO extends CrudRepository<Invoice, String> {

	Invoice findFirstByInvoiceNoAndProfileOrderByInvoiceNoDesc(int invoiceNo, String profile);

	List<Invoice> findAllByInvoiceNoGreaterThanEqualAndInvoiceTimeGreaterThanEqualAndInvoiceTimeLessThanEqualAndProfileOrderByInvoiceNoAsc(int invoiceNo, Date startInvoiceTime, Date endInvoiceTime, String profile);

	List<Invoice> findAllByReferenceSlipNoGreaterThanEqualAndInvoiceTimeGreaterThanEqualAndInvoiceTimeLessThanEqualAndProfileOrderByInvoiceNoAsc(int referenceSlipNo, Date startInvoiceTime, Date endInvoiceTime, String profile);

	List<Invoice> findAllByCustomersNameContainingAndInvoiceTimeGreaterThanEqualAndInvoiceTimeLessThanEqualAndProfileOrderByInvoiceNoAsc(String customersName, Date startInvoiceTime, Date endInvoiceTime, String profile);

	List<Invoice> findAllByVehicleNoContainingAndInvoiceTimeGreaterThanEqualAndInvoiceTimeLessThanEqualAndProfileOrderByInvoiceNoAsc(String vehicleNo, Date startInvoiceTime, Date endInvoiceTime, String profile);

	List<Invoice> findAllByMaterialContainingAndInvoiceTimeGreaterThanEqualAndInvoiceTimeLessThanEqualAndProfileOrderByInvoiceNoAsc(String material, Date startInvoiceTime, Date endInvoiceTime, String profile);

	List<Invoice> findAllByInvoiceTimeGreaterThanEqualAndInvoiceTimeLessThanEqualAndProfileOrderByInvoiceNoAsc(Date startInvoiceTime, Date endInvoiceTime, String profile);

	Long deleteByProfile(String profile);
}
