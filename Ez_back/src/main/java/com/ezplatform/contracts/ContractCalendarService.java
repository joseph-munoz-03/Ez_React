    package com.ezplatform.contracts;

    import com.ezplatform.entity.CalendarEvent;
    import com.ezplatform.entity.Contract;
    import com.ezplatform.repository.CalendarEventRepository;
    import lombok.RequiredArgsConstructor;
    import org.springframework.stereotype.Service;

    import java.time.LocalDate;

    @Service
    @RequiredArgsConstructor
    public class ContractCalendarService {

        private final CalendarEventRepository calendarRepository;

        public void createEvent(Contract contract) {

            CalendarEvent event = new CalendarEvent();

            event.setTitle("Contrato #" + contract.getId());
            event.setDate(LocalDate.now());
            event.setUser(contract.getEngineer().getEmail());

            calendarRepository.save(event);
        }
    }